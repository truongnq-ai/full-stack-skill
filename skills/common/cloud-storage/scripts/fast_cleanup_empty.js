const { google } = require('googleapis');
const { getDriveClient } = require('./auth');
const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, 'migration.config.json');
const CONFIG = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
const TARGET_FOLDER_ID = CONFIG.targetRootFolderId;
const BYPASS_FOLDERS = (CONFIG.bypassFolders || []).map(f => f.toLowerCase());

const SHARED_DRIVE_PARAMS = CONFIG.sharedDriveId
    ? { supportsAllDrives: true, includeItemsFromAllDrives: true, corpora: 'drive', driveId: CONFIG.sharedDriveId }
    : {};

async function fastCleanup() {
    const drive = await getDriveClient();
    const startTime = Date.now();
    console.log('⚡ BẮT ĐẦU CLEANUP SIÊU TỐC: Đang quét toàn bộ meta-data Drive...');

    // 1. Lấy root ID thực sự
    let ROOT_ID = CONFIG.sourceRootFolderId;
    if (!ROOT_ID || ROOT_ID === 'root') {
        const rootMeta = await drive.files.get({ fileId: 'root', fields: 'id', ...SHARED_DRIVE_PARAMS });
        ROOT_ID = rootMeta.data.id;
    }

    // 2. Fetch toàn bộ files/folders (chỉ những file không bị trashed)
    const allItems = [];
    let pageToken = null;
    do {
        const res = await drive.files.list({
            // Tìm các files không bị xóa và THUỘC SỞ HỮU CỦA USER, bỏ qua Shared with me
            q: "'me' in owners and trashed=false",
            fields: 'nextPageToken, files(id, name, mimeType, parents)',
            pageSize: 1000,
            ...SHARED_DRIVE_PARAMS
        });
        const items = res.data.files || [];
        allItems.push(...items);
        process.stdout.write(`\r[Loading] Đã nạp ${allItems.length} items từ Drive...`);
        pageToken = res.data.nextPageToken;
    } while (pageToken);
    console.log(`\n✅ Quét xong meta-data: ${allItems.length} files/folders.`);

    // 3. Phân tích cấu trúc thư mục
    const itemsMap = new Map();
    const childrenMap = new Map(); // pId => [child objects]

    allItems.forEach(item => {
        itemsMap.set(item.id, item);
        if (item.parents) {
            item.parents.forEach(pId => {
                if (!childrenMap.has(pId)) childrenMap.set(pId, []);
                childrenMap.get(pId).push(item);
            });
        }
    });

    // 4. Marking (Đánh dấu những thư mục CÓ file)
    const hasFilesMap = new Map(); // id => boolean
    hasFilesMap.set(ROOT_ID, true); // Root luôn có file (hoặc không bh xóa)

    function bubbleUp(id) {
        if (!id || hasFilesMap.get(id)) return;
        hasFilesMap.set(id, true);
        const item = itemsMap.get(id);
        if (item && item.parents) {
            item.parents.forEach(pId => bubbleUp(pId));
        }
    }

    // Đánh dấu từ các file thực (không phải folder)
    for (const item of allItems) {
        if (item.mimeType !== 'application/vnd.google-apps.folder') {
            bubbleUp(item.id);
        }
    }

    // 5. Bypass System Folders
    function protectTree(id) {
        bubbleUp(id); // Bảo vệ cha
        // Bảo vệ toàn bộ con
        const children = childrenMap.get(id) || [];
        for (const child of children) {
            if (!hasFilesMap.get(child.id)) {
                hasFilesMap.set(child.id, true); // Set cứng là "có file" để tránh bị xóa
                protectTree(child.id);
            }
        }
    }

    for (const item of allItems) {
        if (item.mimeType === 'application/vnd.google-apps.folder') {
            const lowerName = item.name.toLowerCase();
            // Bảo vệ Target Migration (Tất cả thành quả của ta đang nằm đây)
            if (item.id === TARGET_FOLDER_ID) {
                protectTree(item.id);
            } else if (BYPASS_FOLDERS.some(b => lowerName.includes(b))) {
                protectTree(item.id);
            }
        }
    }

    // 6. Tìm TOP-MOST Empty Folders (Thư mục trống to nhất)
    const topEmptyFolders = [];
    for (const item of allItems) {
        if (item.mimeType === 'application/vnd.google-apps.folder') {
            if (!hasFilesMap.get(item.id)) {
                // Kiểm tra xem đây có phải là Top-Most không
                let isTopMost = true;
                if (item.parents && item.parents.length > 0) {
                    for (const pId of item.parents) {
                        let parentHasFiles = true; // Mặc định cha ko xác định thì coi như giữ
                        if (itemsMap.has(pId) || pId === ROOT_ID) {
                            parentHasFiles = hasFilesMap.get(pId) || false;
                        }
                        // Nếu có 1 parent mà cũng bị trống (sẽ bị xoá) -> thì mình không phải Top-Most
                        if (!parentHasFiles) {
                            isTopMost = false;
                            break;
                        }
                    }
                }
                if (isTopMost) {
                    topEmptyFolders.push(item);
                }
            }
        }
    }

    console.log(`\n🎯 Phân tích xong! \n[KẾT QUẢ]: Có ${topEmptyFolders.length} Thư Mục Lớn Nhất hoàn toàn rỗng bên trong chứa rễ con.`);

    // 7. Thực thi Xóa
    if (topEmptyFolders.length === 0) {
        console.log('Không còn thư mục trống nào cần xóa!');
        return;
    }

    console.log('🗑️ Bắt đầu tiến hành xóa (TRASH) bằng 1 lệnh cho mỗi cụm:');
    let successCount = 0;
    for (const emptyFolder of topEmptyFolders) {
        try {
            await drive.files.update({
                fileId: emptyFolder.id,
                requestBody: { trashed: true },
                ...SHARED_DRIVE_PARAMS
            });
            console.log(`✅ [TRASHED] Cụm lớn rỗng: "${emptyFolder.name}"`);
            successCount++;
        } catch (e) {
            console.error(`❌ [LỖI] Xóa "${emptyFolder.name}":`, e.message);
        }
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`\n✨ Xong siêu tốc trong ${duration}s! Đã diệt ${successCount} cụm thư mục trống tận gốc.`);
}

fastCleanup().catch(err => {
    console.error('\n❌ LỖI NGHIÊM TRỌNG:', err.message);
    process.exit(1);
});
