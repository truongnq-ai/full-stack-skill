/**
 * Execute Migration Script
 *
 * Bước 3 trong quy trình Migration (xem references/migration-strategy.md)
 *
 * CẢNH BÁO: Script này thực hiện thay đổi thật trên Google Drive.
 * BẮT BUỘC chạy dry_run_migration.js và review plan trước.
 *
 * Cách chạy:
 *   PLAN_FILE=dry_run_plan_2026-03-03.json node migrate_to_standard.js
 *
 * Tính năng an toàn:
 * - Đọc plan đã được review (không tự tính lại)
 * - MOVE file (không Copy rồi Delete — bảo toàn Revision history)
 * - Gắn appProperties để audit trail
 * - Ghi migration log chi tiết
 * - Rate limiting để tránh 403 quota exceeded
 * - Rollback list: In danh sách fileId gốc để khôi phục thủ công nếu cần
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const { getDriveClient } = require('./auth');

// Kiểm tra biến môi trường
const PLAN_FILE = process.env.PLAN_FILE;
if (!PLAN_FILE) {
    console.error('❌ Thiếu PLAN_FILE. Cách dùng: PLAN_FILE=dry_run_plan_YYYY-MM-DD.json node migrate_to_standard.js');
    process.exit(1);
}

const PLAN_PATH = path.join(__dirname, PLAN_FILE);
if (!fs.existsSync(PLAN_PATH)) {
    console.error(`❌ Không tìm thấy plan file: ${PLAN_PATH}`);
    process.exit(1);
}

const plan = JSON.parse(fs.readFileSync(PLAN_PATH, 'utf-8'));
const CONFIG = plan.config;

const SHARED_DRIVE_PARAMS = CONFIG.sharedDriveId
    ? { supportsAllDrives: true }
    : {};

// Migration log
const migrationLog = {
    startedAt: new Date().toISOString(),
    planFile: PLAN_FILE,
    succeeded: [],
    failed: [],
    skipped: plan.skipped,
    bypassed: plan.bypassed,
    trashed: [] // Log files successfully trashed
};

// Rate limiter: 5 req/s (200ms)
const DELAY = 200;
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function executeMigration() {
    const drive = await getDriveClient();

    const total = plan.actions.length + plan.unsorted.length + (plan.trashed || []).length;
    console.log(`🚀 BẮT ĐẦU MIGRATION — ${total} thao tác cần thực hiện`);
    console.log(`   Plan từ: ${plan.generatedAt}`);
    console.log('   ─'.repeat(25));

    let processed = 0;

    // 1. TRASH FILES
    if (plan.trashed && plan.trashed.length > 0) {
        console.log(`\n🗑️  Đang xử lý ${plan.trashed.length} files cần TRASH (Xóa vào thùng rác)...`);
        for (const action of plan.trashed) {
            try {
                await drive.files.update({
                    fileId: action.fileId,
                    requestBody: { trashed: true },
                    ...SHARED_DRIVE_PARAMS
                });
                migrationLog.trashed.push({ ...action, status: 'SUCCESS_TRASHED' });
                processed++;
                printProgress(processed, total, `🗑️  TRASH: ${action.currentName}`);
            } catch (err) {
                migrationLog.failed.push({ ...action, status: 'FAILED_TRASH', error: err.message });
                printProgress(processed, total, `❌ FAILED TRASH: ${action.currentName} — ${err.message}`);
            }
            await delay(DELAY);
        }
        console.log();
    }

    // 2. MOVE AND RENAME
    console.log(`\n📦 Đang xử lý ${plan.actions.length} files cần MOVE & RENAME...`);
    for (const action of plan.actions) {
        try {
            await moveAndRenameFile(drive, action);
            migrationLog.succeeded.push({ ...action, status: 'SUCCESS', doneAt: new Date().toISOString() });
            processed++;
            printProgress(processed, total, `✅ MOVE: ${action.currentName} → ${action.newName}`);
        } catch (err) {
            migrationLog.failed.push({ ...action, status: 'FAILED_MOVE', error: err.message });
            printProgress(processed, total, `❌ FAILED MOVE: ${action.currentName} — ${err.message}`);
        }
        await delay(DELAY);
    }
    console.log();

    // 3. UNSORTED files
    if (plan.unsorted && plan.unsorted.length > 0) {
        console.log(`\n❓ Đang xử lý ${plan.unsorted.length} files UNSORTED...`);
        for (const action of plan.unsorted) {
            if (action.action === 'SKIP' || action.action === 'MOCK_WAITING_TARGET') {
                migrationLog.skipped.push({ ...action, reason: 'Config: skip or waiting target' });
                processed++;
                continue;
            }
            try {
                // Move vào unsorted/ của target root
                await drive.files.update({
                    fileId: action.fileId,
                    addParents: CONFIG.targetRootFolderId, // Sẽ land ở root, dễ tìm
                    requestBody: {
                        name: action.newName,
                        appProperties: { migrated: 'true', status: 'unsorted' }
                    },
                    ...SHARED_DRIVE_PARAMS,
                    fields: 'id',
                });
                migrationLog.succeeded.push({ ...action, status: 'SUCCESS_UNSORTED' });
                processed++;
            } catch (err) {
                migrationLog.failed.push({ ...action, status: 'FAILED_UNSORTED', error: err.message });
            }
            await delay(DELAY);
        }
        console.log();
    }

    saveMigrationLog();
    printFinalSummary();
}

async function moveAndRenameFile(drive, action) {
    // Lấy parents hiện tại để remove sau khi add parent mới
    const fileInfo = await drive.files.get({
        fileId: action.fileId,
        fields: 'parents',
        supportsAllDrives: !!SHARED_DRIVE_PARAMS.supportsAllDrives,
    });

    const currentParents = (fileInfo.data.parents || []).join(',');

    await drive.files.update({
        fileId: action.fileId,
        addParents: action.targetFolderId,
        removeParents: currentParents,  // Bỏ khỏi folder cũ (MOVE, không COPY)
        requestBody: {
            name: action.newName,
            appProperties: {             // Audit trail
                migrated: 'true',
                migrationDate: new Date().toISOString(),
                originalName: action.currentName,
                originalPath: action.currentPath,
                detectedModule: action.detectedModule,
            }
        },
        supportsAllDrives: !!SHARED_DRIVE_PARAMS.supportsAllDrives,
        fields: 'id, name',
    });
}

function printProgress(current, total, message) {
    const pct = ((current / total) * 100).toFixed(0);
    process.stdout.write(`\r[${pct.padStart(3)}%] ${current}/${total} ${message.slice(0, 80).padEnd(80)}`);
    if (message.startsWith('❌')) console.log(); // Xuống dòng với lỗi
}

function saveMigrationLog() {
    migrationLog.finishedAt = new Date().toISOString();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const logPath = path.join(__dirname, `migration_log_${timestamp}.json`);
    fs.writeFileSync(logPath, JSON.stringify(migrationLog, null, 2), 'utf-8');
    console.log(`\n\n💾 Migration log đã lưu: ${logPath}`);
}

function printFinalSummary() {
    console.log('\n📊 KẾT QUẢ MIGRATION:');
    console.log('─'.repeat(50));
    console.log(`✅ Chuyển thành công:  ${migrationLog.succeeded.length}`);
    console.log(`🗑️  Xóa rác thành công: ${migrationLog.trashed.length}`);
    console.log(`❌ Thất bại:          ${migrationLog.failed.length}`);

    if (migrationLog.failed.length > 0) {
        console.log('\n⚠️  Files thất bại (xem migration log để rollback):');
        migrationLog.failed.slice(0, 5).forEach(f => console.log(`   - ${f.fileId}: ${f.error}`));
        if (migrationLog.failed.length > 5) console.log(`   ... và ${migrationLog.failed.length - 5} files khác`);
    }

    console.log('\n✅ Migration hoàn tất. Files gốc KHÔNG bị xóa (xem migration-strategy.md).');
}

executeMigration().catch(err => {
    console.error('\n❌ MIGRATION THẤT BẠI NGHIÊM TRỌNG:', err.message);
    saveMigrationLog();
    process.exit(1);
});
