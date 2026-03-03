/**
 * sort_from_unsorted.js
 *
 * Auto-sort files từ prod/unsorted/ dựa trên 2 chiều:
 * 1. Nguồn gốc (originalPath từ dry_run_plan) → context (company/personal/document...)
 * 2. Extension → loại file (documents/media/archives/mindmaps/notes)
 *
 * Bỏ UUID và trả về tên file gốc khi di chuyển.
 *
 * KHÔNG thực thi nếu chưa được xác nhận bởi người dùng.
 */
const { getDriveClient } = require('./auth');
const fs = require('fs');
const path = require('path');

const CONFIG = JSON.parse(fs.readFileSync(path.join(__dirname, 'migration.config.json'), 'utf-8'));
const PLAN = JSON.parse(fs.readFileSync(path.join(__dirname, 'dry_run_plan_2026-03-03.json'), 'utf-8'));

const UNSORTED_ID = '1oPcJdRSTeExDJGC4Xe-blrLW-GgfVtYM';   // personal_workspace/prod/unsorted/
const PROD_ID = '1AsUwhJsvQb4NMl5aCA3RkW9EoG0BYsiD';   // personal_workspace/prod/

const DELAY_MS = 200;
const delay = ms => new Promise(r => setTimeout(r, ms));

// Build lookup: fileId → { currentPath (original), currentName (original) }
const fileOriginMap = new Map();
for (const item of (PLAN.unsorted || [])) {
    fileOriginMap.set(item.fileId, {
        originalPath: item.currentPath || '/',
        originalName: item.currentName || item.currentName || ''
    });
}
console.log(`📚 Plan lookup: ${fileOriginMap.size} file entries loaded.\n`);

// ===== RULES: extension → loại file =====
const DOCUMENT_EXTS = new Set(['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'odt', 'ods']);
const MEDIA_EXTS = new Set(['jpg', 'jpeg', 'png', 'gif', 'mp4', 'mov', 'avi']);
const ARCHIVE_EXTS = new Set(['rar', 'zip', 'tar', 'gz', '7z', 'xzip']);
const MINDMAP_EXTS = new Set(['mmap', 'mindmup', 'xmind']);
const NOTE_EXTS = new Set(['txt', 'md']);

// ===== RULES: originalPath keyword → context =====
function getContext(p) {
    const lp = p.toLowerCase();
    if (lp.includes('04.company') || lp.includes('08.working')) return 'company';
    if (lp.includes('01.personal') || lp.includes('00.khan')) return 'personal';
    if (lp.includes('00.mindmap')) return 'mindmap';
    if (lp.includes('05.document')) return 'document';
    return 'other';
}

function getFileType(name) {
    const ext = name.split('.').pop().toLowerCase();
    if (MINDMAP_EXTS.has(ext)) return 'mindmap';
    if (DOCUMENT_EXTS.has(ext)) return 'document';
    if (ARCHIVE_EXTS.has(ext)) return 'archive';
    if (MEDIA_EXTS.has(ext)) return 'media';
    if (NOTE_EXTS.has(ext)) return 'note';
    return null; // Không xác định → giữ trong unsorted
}

// ===== FOLDER CREATION =====
async function findOrCreateFolder(drive, parentId, name) {
    const res = await drive.files.list({
        q: `'${parentId}' in parents and name='${name}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
        fields: 'files(id, name)',
        pageSize: 5
    });
    if (res.data.files.length > 0) return res.data.files[0].id;
    const created = await drive.files.create({
        requestBody: { name, mimeType: 'application/vnd.google-apps.folder', parents: [parentId] },
        fields: 'id'
    });
    console.log(`📁 Tạo mới thư mục: ${name} (ID: ${created.data.id})`);
    return created.data.id;
}

// ===== MAIN =====
async function sortFiles() {
    const drive = await getDriveClient();

    console.log('📁 Khởi tạo cây thư mục đích...\n');
    // Tạo cấu trúc thư mục đích
    const companyId = await findOrCreateFolder(drive, PROD_ID, 'company');
    const compDocsId = await findOrCreateFolder(drive, companyId, 'documents');

    const personalId = await findOrCreateFolder(drive, PROD_ID, 'personal');
    const persDocsId = await findOrCreateFolder(drive, personalId, 'documents');
    const persMediaId = await findOrCreateFolder(drive, personalId, 'media');
    const persArchId = await findOrCreateFolder(drive, personalId, 'archives');
    const persNotesId = await findOrCreateFolder(drive, personalId, 'notes');

    const docsId = await findOrCreateFolder(drive, PROD_ID, 'documents');
    const mindmapsId = await findOrCreateFolder(drive, docsId, 'mindmaps');
    const notesId = await findOrCreateFolder(drive, docsId, 'notes');

    // MAPPING: context + fileType → folderId
    function resolveTarget(context, fileType) {
        if (context === 'company') {
            if (fileType === 'document') return compDocsId;
            return null; // Không sort file khác của company
        }
        if (context === 'personal') {
            if (fileType === 'document') return persDocsId;
            if (fileType === 'media') return persMediaId;
            if (fileType === 'archive') return persArchId;
            if (fileType === 'note') return persNotesId;
        }
        if (context === 'mindmap') {
            if (fileType === 'mindmap') return mindmapsId;
            if (fileType === 'document') return docsId;  // docx/doc trong MindMap folder
        }
        if (context === 'document') {
            if (fileType === 'document' || fileType === 'note') return docsId;
            if (fileType === 'note') return notesId;
        }
        return null; // Không xác định → giữ trong unsorted
    }

    console.log('\n🔍 Bắt đầu quét và phân loại files trong unsorted/...\n');

    let pageToken = null;
    let processedCount = 0, movedCount = 0, skippedCount = 0, errorCount = 0;
    const sortLog = { moved: [], skipped: [], errors: [] };

    do {
        const res = await drive.files.list({
            q: `'${UNSORTED_ID}' in parents and trashed=false`,
            fields: 'nextPageToken, files(id, name, mimeType)',
            pageSize: 100,
            pageToken
        });

        const files = res.data.files || [];
        pageToken = res.data.nextPageToken;

        for (const file of files) {
            processedCount++;
            const origin = fileOriginMap.get(file.id);

            if (!origin) {
                // Không tìm thấy trong plan (file lạ) → skip
                skippedCount++;
                sortLog.skipped.push({ id: file.id, name: file.name, reason: 'NOT_IN_PLAN' });
                continue;
            }

            const context = getContext(origin.originalPath);
            const fileType = getFileType(origin.originalName);

            if (!fileType) {
                skippedCount++;
                sortLog.skipped.push({ id: file.id, name: file.name, originalPath: origin.originalPath, reason: 'UNKNOWN_TYPE' });
                continue;
            }

            const targetFolderId = resolveTarget(context, fileType);

            if (!targetFolderId) {
                skippedCount++;
                sortLog.skipped.push({ id: file.id, name: file.name, originalPath: origin.originalPath, context, fileType, reason: 'NO_RULE_MATCH' });
                continue;
            }

            // Tiến hành MOVE + RENAME về tên gốc
            try {
                await drive.files.update({
                    fileId: file.id,
                    addParents: targetFolderId,
                    removeParents: UNSORTED_ID,
                    requestBody: { name: origin.originalName }, // Đặt lại tên gốc, bỏ UUID
                    fields: 'id, name',
                    supportsAllDrives: true
                });
                movedCount++;
                process.stdout.write(`\r✅ [${movedCount} moved / ${skippedCount} skipped] — ${origin.originalName.slice(0, 50)}`);
                sortLog.moved.push({ id: file.id, originalName: origin.originalName, originalPath: origin.originalPath, context, fileType });
            } catch (e) {
                errorCount++;
                console.error(`\n❌ LỖI di chuyển "${origin.originalName}": ${e.message}`);
                sortLog.errors.push({ id: file.id, name: origin.originalName, error: e.message });
            }
            await delay(DELAY_MS);
        }
    } while (pageToken);

    // Lưu log
    const timestamp = new Date().toISOString().slice(0, 10);
    const logPath = path.join(__dirname, `sort_log_${timestamp}.json`);
    fs.writeFileSync(logPath, JSON.stringify(sortLog, null, 2), 'utf-8');

    console.log(`\n\n🎉 XONG!`);
    console.log(`✅ Đã di chuyển và đặt lại tên: ${movedCount} files`);
    console.log(`⏭️  Giữ nguyên trong unsorted:   ${skippedCount} files`);
    console.log(`❌ Lỗi:                          ${errorCount} files`);
    console.log(`📄 Log chi tiết: ${logPath}`);
    console.log(`\n📊 Tổng quét: ${processedCount} files trong unsorted/`);
}

sortFiles().catch(err => {
    console.error('\n❌ LỖI NGHIÊM TRỌNG:', err.message);
    process.exit(1);
});
