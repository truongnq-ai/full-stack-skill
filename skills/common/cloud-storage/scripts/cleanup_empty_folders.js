const { google } = require('googleapis');
const { getDriveClient } = require('./auth');
const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, 'migration.config.json');
const CONFIG = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
const TARGET_FOLDER_ID = CONFIG.targetRootFolderId;
const BYPASS_FOLDERS = (CONFIG.bypassFolders || []).map(f => f.toLowerCase());
const ROOT_ID = CONFIG.sourceRootFolderId || 'root';

const SHARED_DRIVE_PARAMS = CONFIG.sharedDriveId
    ? { supportsAllDrives: true, includeItemsFromAllDrives: true, corpora: 'drive', driveId: CONFIG.sharedDriveId }
    : {};

let trashedCount = 0;

async function cleanup() {
    const drive = await getDriveClient();
    console.log('🧹 BẮT ĐẦU QUÉT VÀ DỌN DẸP CÁC THƯ MỤC TRỐNG...\n');

    await processFolder(drive, ROOT_ID, '/');

    console.log('\n✅ Dọn dẹp hoàn tất.');
    console.log(`Đã dọn dẹp (chuyển vào Thùng rác): ${trashedCount} thư mục trống.`);
}

async function processFolder(drive, folderId, folderPath) {
    let pageToken = null;
    const children = [];

    do {
        const res = await drive.files.list({
            q: `'${folderId}' in parents and trashed=false`,
            fields: 'nextPageToken, files(id, name, mimeType)',
            pageSize: 100,
            pageToken,
            ...SHARED_DRIVE_PARAMS
        });
        const files = res.data.files || [];
        children.push(...files);
        pageToken = res.data.nextPageToken;
    } while (pageToken);

    let isEmpty = true;
    for (const child of children) {
        if (child.mimeType === 'application/vnd.google-apps.folder') {
            const lowerName = child.name.toLowerCase();
            // Bỏ qua thư mục đích (personal_workspace) và các thư mục bypass (Takeout, LabanKey...)
            if (child.id === TARGET_FOLDER_ID || BYPASS_FOLDERS.some(b => lowerName.includes(b))) {
                isEmpty = false;
                continue; // Không quét vào bên trong bypass folder để tiết kiệm API
            }

            // Đệ quy quét con
            const childIsEmpty = await processFolder(drive, child.id, `${folderPath}${child.name}/`);
            if (!childIsEmpty) {
                isEmpty = false;
            }
        } else {
            // Nếu có file (ảnh, doc, v.v...) thì thư mục này KHÔNG trống
            isEmpty = false;
        }
    }

    // Nếu thư mục này trống (và không phải root), hãy TRASH nó
    if (isEmpty && folderId !== ROOT_ID) {
        try {
            await drive.files.update({
                fileId: folderId,
                requestBody: { trashed: true },
                ...SHARED_DRIVE_PARAMS
            });
            console.log(`🗑️  [DELETED] Thư mục trống: ${folderPath}`);
            trashedCount++;
        } catch (e) {
            console.error(`❌ Lỗi khi xóa thư mục ${folderPath}: ${e.message}`);
            isEmpty = false; // Lỗi không xóa được thì coi như không trống
        }
    }

    return isEmpty;
}

cleanup().catch(err => {
    console.error('\n❌ LỖI NGHIÊM TRỌNG:', err.message);
    process.exit(1);
});
