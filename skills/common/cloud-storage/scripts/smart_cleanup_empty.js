/**
 * smart_cleanup_empty.js
 *
 * Phương pháp: Targeted recursive scan từ thư mục gốc CŨ của user.
 *
 * Thay vì dùng Drive API để list toàn bộ file (gồm cả file trong thùng rác, shared, orphans),
 * script này dùng Google Drive Trash API logic:
 * - Tìm TẤT CẢ các thư mục trực tiếp ở root Drive hiện tại (không phải top-level cũ mà là
 *   thư mục anh tạo, còn nằm ở ngoài personal_workspace)
 * - Với mỗi thư mục đó, kiểm tra đệ quy xem có file con nào KHÔNG BỊ TRASH không
 * - Nếu thư mục đó hoàn toàn rỗng (hoặc chỉ chứa thư mục con rỗng) -> TRASH 1 lần là xong
 *
 * Ưu điểm: Chỉ đọc đúng scope cần thiết, không bị vướng vào vùng Thùng rác và Shared.
 */
const { getDriveClient } = require('./auth');
const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, 'migration.config.json');
const CONFIG = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
const TARGET_FOLDER_ID = CONFIG.targetRootFolderId;
const BYPASS_FOLDERS = (CONFIG.bypassFolders || []).map(f => f.toLowerCase());

const DELAY_MS = 50;
const delay = ms => new Promise(r => setTimeout(r, ms));

let trashCount = 0;

async function smartCleanup() {
    const drive = await getDriveClient();
    console.log('🔎 Quét danh sách thư mục trực tiếp ở Root Drive...\n');

    // Chỉ lấy thư mục con trực tiếp của ROOT - không cần phân trang nhiều (~10-20 folders max)
    const res = await drive.files.list({
        q: "'root' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false",
        fields: 'files(id, name)',
        pageSize: 100
    });

    const rootFolders = (res.data.files || []).filter(f => {
        // Loại bỏ personal_workspace (thư mục đích - đang chứa file mới của anh)
        if (f.id === TARGET_FOLDER_ID) {
            console.log(`🛡️  Bảo vệ: "${f.name}" (Thư mục đích, không đụng)`);
            return false;
        }
        // Loại bỏ bypass folders (Takeout, Photos, LabanKey, MoneyManager...)
        const lowerName = f.name.toLowerCase();
        if (BYPASS_FOLDERS.some(b => lowerName.includes(b))) {
            console.log(`🛡️  Bảo vệ: "${f.name}" (System folder, không đụng)`);
            return false;
        }
        return true;
    });

    console.log(`\n📁 Còn ${rootFolders.length} thư mục cần kiểm tra:\n`);
    rootFolders.forEach(f => console.log(`   → ${f.name} (${f.id})`));
    console.log('');

    for (const folder of rootFolders) {
        const isEmpty = await checkAndCleanFolder(drive, folder.id, folder.name, `/${folder.name}/`);
        if (isEmpty) {
            // Thư mục gốc rỗng -> TRASH toàn bộ cụm một lần
            try {
                await drive.files.update({
                    fileId: folder.id,
                    requestBody: { trashed: true }
                });
                trashCount++;
                console.log(`🗑️  [XÓA CỤM] "${folder.name}" hoàn toàn rỗng → Đã chuyển vào Thùng rác`);
            } catch (e) {
                console.error(`❌ LỖI xóa "${folder.name}": ${e.message}`);
            }
        } else {
            console.log(`📂 "${folder.name}" vẫn còn file → Giữ nguyên`);
        }
        await delay(DELAY_MS);
    }

    console.log(`\n✅ XONG! Đã dọn ${trashCount} cụm thư mục rỗng.`);
}

/**
 * Kiểm tra xem thư mục có trống hoàn toàn không (không còn file nào, không kể Trassshed).
 * @returns boolean - true nếu rỗng hoàn toàn
 */
async function checkAndCleanFolder(drive, folderId, folderName, folderPath) {
    let pageToken = null;
    const children = [];

    do {
        const res = await drive.files.list({
            q: `'${folderId}' in parents and trashed=false`,
            fields: 'nextPageToken, files(id, name, mimeType)',
            pageSize: 100,
            pageToken
        });
        children.push(...(res.data.files || []));
        pageToken = res.data.nextPageToken;
        await delay(DELAY_MS);
    } while (pageToken);

    if (children.length === 0) {
        return true; // Thư mục rỗng hoàn toàn
    }

    let allChildrenEmpty = true;
    for (const child of children) {
        if (child.mimeType !== 'application/vnd.google-apps.folder') {
            // Có file thực → KHÔNG rỗng
            return false;
        }
        // Là thư mục con → kiểm tra đệ quy
        const childIsEmpty = await checkAndCleanFolder(drive, child.id, child.name, `${folderPath}${child.name}/`);
        if (!childIsEmpty) {
            allChildrenEmpty = false;
        }
    }

    return allChildrenEmpty;
}

smartCleanup().catch(err => {
    console.error('\n❌ LỖI NGHIÊM TRỌNG:', err.message);
    process.exit(1);
});
