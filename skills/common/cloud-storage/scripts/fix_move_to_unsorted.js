/**
 * fix_move_to_unsorted.js
 * Di chuyển tất cả FILE lẻ nằm trực tiếp trong personal_workspace/ -> prod/unsorted/
 */
const { getDriveClient } = require('./auth');
const fs = require('fs');
const path = require('path');

const CONFIG = JSON.parse(fs.readFileSync(path.join(__dirname, 'migration.config.json'), 'utf-8'));
const WORKSPACE_ID = CONFIG.targetRootFolderId; // personal_workspace/

const DELAY_MS = 200;
const delay = ms => new Promise(r => setTimeout(r, ms));

async function fixMove() {
    const drive = await getDriveClient();

    // 1. Lấy ID của prod/unsorted
    console.log('🔍 Đang tìm thư mục prod/unsorted...');
    const prodRes = await drive.files.list({
        q: `'${WORKSPACE_ID}' in parents and name='prod' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
        fields: 'files(id, name)',
        pageSize: 10
    });
    const prodFolder = (prodRes.data.files || [])[0];
    if (!prodFolder) { console.error('❌ Không tìm thấy thư mục "prod"!'); process.exit(1); }

    const unsortedRes = await drive.files.list({
        q: `'${prodFolder.id}' in parents and name='unsorted' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
        fields: 'files(id, name)',
        pageSize: 10
    });
    const unsortedFolder = (unsortedRes.data.files || [])[0];
    if (!unsortedFolder) { console.error('❌ Không tìm thấy thư mục "unsorted"!'); process.exit(1); }

    console.log(`✅ Target: personal_workspace/prod/unsorted/ (ID: ${unsortedFolder.id})\n`);

    // 2. Lấy danh sách TẤT CẢ file (không phải folder) trong personal_workspace
    let pageToken = null;
    let allFiles = [];
    do {
        const res = await drive.files.list({
            q: `'${WORKSPACE_ID}' in parents and mimeType!='application/vnd.google-apps.folder' and trashed=false`,
            fields: 'nextPageToken, files(id, name)',
            pageSize: 1000,
            pageToken
        });
        allFiles.push(...(res.data.files || []));
        process.stdout.write(`\r[Scan] Tìm thấy ${allFiles.length} files lẻ...`);
        pageToken = res.data.nextPageToken;
    } while (pageToken);

    console.log(`\n📦 Tổng cộng ${allFiles.length} files cần chuyển vào prod/unsorted/\n`);

    if (allFiles.length === 0) {
        console.log('✅ Không có file nào cần di chuyển.');
        return;
    }

    // 3. Di chuyển từng file
    let successCount = 0, failCount = 0;
    for (let i = 0; i < allFiles.length; i++) {
        const file = allFiles[i];
        try {
            await drive.files.update({
                fileId: file.id,
                addParents: unsortedFolder.id,
                removeParents: WORKSPACE_ID,
                fields: 'id',
                supportsAllDrives: true
            });
            successCount++;
            process.stdout.write(`\r[${i + 1}/${allFiles.length}] ✅ ${Math.round((i + 1) / allFiles.length * 100)}% hoàn thành...`);
        } catch (e) {
            failCount++;
            console.error(`\n❌ LỖI di chuyển "${file.name}": ${e.message}`);
        }
        await delay(DELAY_MS);
    }

    console.log(`\n\n🎉 XONG!`);
    console.log(`✅ Di chuyển thành công: ${successCount} files`);
    if (failCount > 0) console.log(`❌ Thất bại: ${failCount} files`);
}

fixMove().catch(err => {
    console.error('\n❌ LỖI NGHIÊM TRỌNG:', err.message);
    process.exit(1);
});
