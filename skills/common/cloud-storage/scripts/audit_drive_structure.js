/**
 * Google Drive Audit Script
 *
 * Bước 1 trong quy trình Migration (xem references/migration-strategy.md)
 *
 * Chức năng:
 * - Quét đệ quy toàn bộ folder nguồn trên Google Drive
 * - Phát hiện: Files vi phạm naming convention, trùng tên, rỗng (0 byte)
 * - Phân loại: MIME type, kích thước theo module
 * - Xuất kết quả ra CSV để review trước khi migration
 *
 * Cách chạy:
 *   node audit_drive_structure.js
 *   SHARED_DRIVE_ID=xxx node audit_drive_structure.js
 *
 * Cấu hình: Chỉnh sửa CONFIG bên dưới hoặc dùng migration.config.json
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const { getDriveClient } = require('./auth');


// ========================
// CẤU HÌNH — CHỈNH SỬA TẠI ĐÂY
// ========================
let CONFIG;
const CONFIG_PATH = path.join(__dirname, 'migration.config.json');
if (fs.existsSync(CONFIG_PATH)) {
    CONFIG = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
} else {
    CONFIG = {
        sourceRootFolderId: process.env.SOURCE_FOLDER_ID || 'root',
        sharedDriveId: process.env.SHARED_DRIVE_ID || null,
    };
}

const SHARED_DRIVE_PARAMS = CONFIG.sharedDriveId
    ? { supportsAllDrives: true, includeItemsFromAllDrives: true, corpora: 'drive', driveId: CONFIG.sharedDriveId }
    : {};

// UUID regex pattern — file đã đặt tên đúng chuẩn
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;

// Kết quả audit
const report = {
    totalFiles: 0,
    totalFolders: 0,
    compliantFiles: 0,
    nonCompliantFiles: 0,
    duplicateNames: {},  // { 'name+parentId': [fileId, ...] }
    emptyFiles: [],
    byMimeType: {},
    allFiles: [],        // Danh sách đầy đủ để xuất CSV
};

async function runAudit() {
    const drive = await getDriveClient();

    console.log(`🔍 Đang audit folder: ${CONFIG.sourceRootFolderId}`);
    console.log(`   Mode: ${CONFIG.sharedDriveId ? 'Shared Drive' : 'My Drive'}\n`);

    await scanFolder(drive, CONFIG.sourceRootFolderId, '/');

    // Tổng hợp kết quả
    printSummary();
    exportCsv();
}


async function scanFolder(drive, folderId, folderPath) {
    let pageToken = null;

    do {
        const response = await drive.files.list({
            q: `'${folderId}' in parents and trashed=false`,
            fields: 'nextPageToken, files(id, name, mimeType, size, parents, modifiedTime)',
            pageSize: 100,
            pageToken,
            ...SHARED_DRIVE_PARAMS,
        });

        const files = response.data.files || [];
        pageToken = response.data.nextPageToken;

        for (const file of files) {
            if (file.mimeType === 'application/vnd.google-apps.folder') {
                report.totalFolders++;
                // Đệ quy vào subfolder
                await scanFolder(drive, file.id, `${folderPath}${file.name}/`);
            } else {
                processFile(file, folderPath);
            }
        }
    } while (pageToken);
}

function processFile(file, folderPath) {
    report.totalFiles++;

    const isCompliant = UUID_REGEX.test(file.name);
    const isEmpty = !file.size || parseInt(file.size) === 0;
    const duplicateKey = `${file.name}::${(file.parents || []).join(',')}`;

    // Tracking
    if (isCompliant) report.compliantFiles++;
    else report.nonCompliantFiles++;
    if (isEmpty) report.emptyFiles.push({ id: file.id, name: file.name, path: folderPath });

    // MIME type stats
    const mime = file.mimeType || 'unknown';
    report.byMimeType[mime] = (report.byMimeType[mime] || 0) + 1;

    // Duplicate detection
    if (!report.duplicateNames[duplicateKey]) report.duplicateNames[duplicateKey] = [];
    report.duplicateNames[duplicateKey].push(file.id);

    // Thêm vào danh sách đầy đủ
    report.allFiles.push({
        id: file.id,
        name: file.name,
        path: folderPath,
        mimeType: mime,
        sizeBytes: file.size || 0,
        isCompliant,
        isEmpty,
        modifiedTime: file.modifiedTime,
    });

    // Progress indicator
    if (report.totalFiles % 100 === 0) process.stdout.write(`\r   Đã quét ${report.totalFiles} files...`);
}

function printSummary() {
    const duplicates = Object.values(report.duplicateNames).filter(ids => ids.length > 1);

    console.log('\n\n📊 KẾT QUẢ AUDIT:');
    console.log('─'.repeat(50));
    console.log(`📁 Tổng folders:          ${report.totalFolders}`);
    console.log(`📄 Tổng files:            ${report.totalFiles}`);
    console.log(`✅ Đúng naming chuẩn:     ${report.compliantFiles} (${pct(report.compliantFiles, report.totalFiles)})`);
    console.log(`❌ Sai naming chuẩn:      ${report.nonCompliantFiles} (${pct(report.nonCompliantFiles, report.totalFiles)})`);
    console.log(`⚠️  File rỗng (0 bytes):   ${report.emptyFiles.length}`);
    console.log(`🔁 Nhóm tên trùng lặp:    ${duplicates.length} nhóm`);
    console.log('\n📦 Phân bổ MIME type:');
    Object.entries(report.byMimeType).sort((a, b) => b[1] - a[1]).slice(0, 10).forEach(([mime, count]) => {
        console.log(`   ${mime.padEnd(55)} ${count}`);
    });
}

function exportCsv() {
    const timestamp = new Date().toISOString().slice(0, 10);
    const outputPath = path.join(__dirname, `audit_report_${timestamp}.csv`);

    const header = 'id,name,path,mimeType,sizeBytes,isCompliant,isEmpty,modifiedTime';
    const rows = report.allFiles.map(f =>
        `"${f.id}","${f.name.replace(/"/g, '""')}","${f.path}","${f.mimeType}",${f.sizeBytes},${f.isCompliant},${f.isEmpty},"${f.modifiedTime}"`
    );

    fs.writeFileSync(outputPath, [header, ...rows].join('\n'), 'utf-8');
    console.log(`\n💾 Báo cáo đã lưu: ${outputPath}`);
    console.log('   → Mở bằng Excel/Google Sheets để review trước khi chạy dry_run_migration.js\n');
}

function pct(n, total) {
    return total > 0 ? `${((n / total) * 100).toFixed(1)}%` : '0%';
}

runAudit().catch(err => {
    console.error('\n❌ Audit thất bại:', err.message);
    process.exit(1);
});
