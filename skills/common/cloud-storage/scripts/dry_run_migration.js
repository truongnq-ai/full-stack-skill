/**
 * Dry Run Migration Script
 *
 * Bước 2 trong quy trình Migration (xem references/migration-strategy.md)
 *
 * Chức năng:
 * - Đọc migration.config.json để hiểu mapping rules
 * - Tính toán plan di chuyển / đổi tên cho từng file
 * - KHÔNG thực thi bất kỳ thay đổi nào trên Drive
 * - Xuất plan.json để anh review trước khi EXECUTE
 *
 * Cách chạy:
 *   node dry_run_migration.js
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { getDriveClient } = require('./auth');

// Đọc cấu hình
const CONFIG_PATH = path.join(__dirname, 'migration.config.json');
if (!fs.existsSync(CONFIG_PATH)) {
    console.error('❌ Không tìm thấy migration.config.json.');
    process.exit(1);
}
const CONFIG = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));

const SHARED_DRIVE_PARAMS = CONFIG.sharedDriveId
    ? { supportsAllDrives: true, includeItemsFromAllDrives: true, corpora: 'drive', driveId: CONFIG.sharedDriveId }
    : {};

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;

const plan = {
    generatedAt: new Date().toISOString(),
    config: CONFIG,
    totalFiles: 0,
    actions: [],
    skipped: [],
    unsorted: [],
    trashed: [],
    bypassed: [],
};

async function runDryRun() {
    const drive = await getDriveClient();

    console.log('🧪 DRY RUN — Không có thay đổi nào được thực hiện trên Drive.');
    console.log(`   Source: ${CONFIG.sourceRootFolderId}`);
    console.log(`   Target: ${CONFIG.targetRootFolderId}\n`);

    const targetFolderMap = await buildTargetFolderMap(drive);
    await planFolder(drive, CONFIG.sourceRootFolderId, '/', targetFolderMap);

    printDryRunSummary();
    exportPlan();
}

async function buildTargetFolderMap(drive) {
    if (CONFIG.targetRootFolderId === 'TO_BE_FILLED') return {};
    const map = {};
    const env = CONFIG.environment || 'prod';

    const response = await drive.files.list({
        q: `'${CONFIG.targetRootFolderId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
        fields: 'files(id, name)',
        ...SHARED_DRIVE_PARAMS,
    });

    for (const envFolder of response.data.files || []) {
        if (envFolder.name !== env) continue;

        const moduleRes = await drive.files.list({
            q: `'${envFolder.id}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
            fields: 'files(id, name)',
            ...SHARED_DRIVE_PARAMS,
        });

        for (const modFolder of moduleRes.data.files || []) {
            map[modFolder.name] = modFolder.id;
        }
    }
    return map;
}

async function planFolder(drive, folderId, folderPath, targetFolderMap) {
    let pageToken = null;

    do {
        const response = await drive.files.list({
            q: `'${folderId}' in parents and trashed=false`,
            fields: 'nextPageToken, files(id, name, mimeType, size)',
            pageSize: 100,
            pageToken,
            ...SHARED_DRIVE_PARAMS,
        });

        const files = response.data.files || [];
        pageToken = response.data.nextPageToken;

        for (const file of files) {
            if (file.mimeType === 'application/vnd.google-apps.folder') {
                const folderNameLower = file.name.toLowerCase();

                // 1. Kiểm tra Bypass Folders (System folders)
                if (CONFIG.bypassFolders && CONFIG.bypassFolders.some(b => folderNameLower.includes(b))) {
                    plan.bypassed.push({ fileId: file.id, name: file.name, path: folderPath, reason: 'System Bypass Folder' });
                    continue; // Dừng, KHÔNG chui vào bên trong folder này
                }

                // Đệ quy
                await planFolder(drive, file.id, `${folderPath}${file.name}/`, targetFolderMap);
            } else {
                planFile(file, folderPath, targetFolderMap);
            }
        }
    } while (pageToken);
}

function planFile(file, currentPath, targetFolderMap) {
    plan.totalFiles++;
    const originalName = file.name;
    const lowerPath = currentPath.toLowerCase();

    // 2. Logic TRASH toàn bộ @Book
    if (CONFIG.trashRules?.folders?.some(f => lowerPath.includes(f))) {
        plan.trashed.push({
            action: 'TRASH', fileId: file.id, currentName: originalName, currentPath, reason: 'Trash Rule: Blocked Folder'
        });
        return;
    }

    // 3. Logic TRASH Company Source Code
    if (CONFIG.trashRules?.companySourceCode?.folderKeyword) {
        const kw = CONFIG.trashRules.companySourceCode.folderKeyword.toLowerCase();
        if (lowerPath.includes(kw)) {
            // Nếu chứa .git -> Trash ngay
            if (lowerPath.includes('.git/')) {
                plan.trashed.push({ action: 'TRASH', fileId: file.id, currentName: originalName, currentPath, reason: 'Trash Rule: Git Object' });
                return;
            }
            // Nếu mimeType KHÔNG nằm trong danh sách keep -> Trash
            if (!CONFIG.trashRules.companySourceCode.keepMimeTypes.includes(file.mimeType)) {
                plan.trashed.push({ action: 'TRASH', fileId: file.id, currentName: originalName, currentPath, reason: 'Trash Rule: Source Code MimeType', mimeType: file.mimeType });
                return;
            }
        }
    }

    const ext = originalName.includes('.') ? originalName.substring(originalName.lastIndexOf('.')) : '';

    if (UUID_REGEX.test(originalName)) {
        plan.skipped.push({ fileId: file.id, name: originalName, path: currentPath, reason: 'Already compliant' });
        return;
    }

    const detectedModule = detectModule(originalName, currentPath, CONFIG.moduleMapping || {});
    const newUuid = crypto.randomUUID();
    const safeSlug = slugify(originalName.replace(/\.[^/.]+$/, '')).slice(0, 50);
    const newName = safeSlug ? `${newUuid}_${safeSlug}${ext}` : `${newUuid}${ext}`;

    if (CONFIG.targetRootFolderId === 'TO_BE_FILLED') {
        // Khi chưa có targetRoot, vứt hết vào mock để tính count
        plan.unsorted.push({ action: 'MOCK_WAITING_TARGET', fileId: file.id, currentName: originalName, currentPath, newName });
        return;
    }

    if (detectedModule && targetFolderMap[detectedModule]) {
        plan.actions.push({
            action: 'MOVE_AND_RENAME',
            fileId: file.id,
            currentName: originalName,
            currentPath,
            newName,
            targetFolderId: targetFolderMap[detectedModule],
            targetPath: `${CONFIG.environment}/${detectedModule}/`,
            detectedModule,
        });
    } else {
        // Không xác định được module
        // Nếu source là 04.Company -> Cho qua documents luôn nếu nó pass vòng loại keepMimeTypes
        if (lowerPath.includes(CONFIG.trashRules?.companySourceCode?.folderKeyword?.toLowerCase())) {
            if (targetFolderMap['documents']) {
                plan.actions.push({
                    action: 'MOVE_AND_RENAME', fileId: file.id, currentName: originalName, currentPath, newName, targetFolderId: targetFolderMap['documents'], targetPath: `${CONFIG.environment}/documents/`, detectedModule: 'documents'
                });
                return;
            }
        }

        const strategy = CONFIG.unknownFileStrategy || 'unsorted';
        plan.unsorted.push({
            action: strategy === 'unsorted' ? 'MOVE_TO_UNSORTED' : 'SKIP',
            fileId: file.id,
            currentName: originalName,
            currentPath,
            newName,
        });
    }
}

function detectModule(filename, filePath, mapping) {
    const lowerName = filename.toLowerCase();
    const lowerPath = filePath.toLowerCase();
    for (const [keyword, module] of Object.entries(mapping)) {
        if (lowerName.includes(keyword.toLowerCase()) || lowerPath.includes(keyword.toLowerCase())) {
            return module;
        }
    }
    return null;
}

function slugify(str) {
    return str
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9\s-]/g, '')
        .trim().replace(/\s+/g, '-').toLowerCase();
}

function printDryRunSummary() {
    console.log('📋 DRY RUN PLAN SUMMARY:');
    console.log('─'.repeat(50));
    console.log(`📄 Tổng files quét:        ${plan.totalFiles}`);
    console.log(`✅ Đã chuẩn (skipped):     ${plan.skipped.length}`);
    console.log(`🛡️  Bỏ qua (system):        ${plan.bypassed.length} folders (nội dung bên trong không quét)`);
    console.log(`🗑️  Sẽ bị TRASH (Xóa mềm):  ${plan.trashed.length}`);
    console.log(`🔄 Sẽ MOVE + RENAME:       ${plan.actions.length}`);
    console.log(`❓ Không xác định module:  ${plan.unsorted.length}`);
    if (CONFIG.targetRootFolderId === 'TO_BE_FILLED') {
        console.log(`\n⚠️  LƯU Ý: Anh CHƯA tạo targetFolderId (Thư mục đích). Hãy chạy init script.`);
    }
}

function exportPlan() {
    const timestamp = new Date().toISOString().slice(0, 10);
    const outputPath = path.join(__dirname, `dry_run_plan_${timestamp}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(plan, null, 2), 'utf-8');
    console.log(`\n💾 Plan đã lưu: ${outputPath}\n`);
}

runDryRun().catch(err => {
    console.error('\n❌ Dry run thất bại:', err.message);
    process.exit(1);
});
