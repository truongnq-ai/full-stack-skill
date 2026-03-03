/**
 * Google Drive Workspace Auto-Initializer (v2 — Shared Drive Support)
 *
 * Target: Dùng cho AI Agent/Lập trình viên khi khởi tạo dự án mới.
 * Chức năng:
 * - Đăng nhập Google Drive thông qua Service Account (credentials.json)
 * - Tự động tạo cây thư mục chuẩn: ROOT -> [ENV] -> [MODULE]
 * - Hỗ trợ cả My Drive (dev/test) và Shared Drive (production)
 * - Idempotency: Quét xem thư mục đã tồn tại chưa, nếu có dùng lại ID cũ
 * - In ra kết quả để copy trực tiếp vào .env
 *
 * Cách dùng:
 *   My Drive (dev/test):   node init_google_drive_folder_structure.js
 *   Shared Drive (prod):   SHARED_DRIVE_ID=xxx node init_google_drive_folder_structure.js
 */

const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
const { getDriveClient } = require('./auth');

// Cấu hình Cây thư mục cần khởi tạo
const WORKSPACE_TREE = {
    rootName: 'personal_workspace',
    environments: ['prod'], // Chỉ tạo 1 level thôi cho Drive cá nhân
    modules: ['documents', 'library', 'company_archives', 'media', 'private', 'setups', 'unsorted']
};

const SHARED_DRIVE_ID = process.env.SHARED_DRIVE_ID || null;
const SHARED_DRIVE_PARAMS = SHARED_DRIVE_ID
    ? { supportsAllDrives: true, includeItemsFromAllDrives: true, corpora: 'drive', driveId: SHARED_DRIVE_ID }
    : {};

async function initializeWorkspace() {
    const drive = await getDriveClient();

    const mode = SHARED_DRIVE_ID ? `Shared Drive (ID: ${SHARED_DRIVE_ID})` : 'My Drive';
    console.log(`🚀 Kết nối Google Drive — Mode: ${mode}`);

    try {
        // 1. Tạo/lấy Thư mục Gốc
        const rootFolderId = await getOrCreateFolder(drive, WORKSPACE_TREE.rootName, SHARED_DRIVE_ID || null, true);
        console.log(`\n📂 ROOT [${WORKSPACE_TREE.rootName}]: ${rootFolderId}`);

        const envVariables = [`GOOGLE_DRIVE_ROOT_FOLDER_ID=${rootFolderId}`];

        // 2. Tạo cụm Môi trường
        for (const env of WORKSPACE_TREE.environments) {
            const envFolderId = await getOrCreateFolder(drive, env, rootFolderId, false);
            console.log(`  ├── ENV [${env}]: ${envFolderId}`);
            envVariables.push(`GOOGLE_DRIVE_FOLDER_${env.toUpperCase()}=${envFolderId}`);

            // 3. Tạo cụm Module bên trong Môi trường
            for (const mod of WORKSPACE_TREE.modules) {
                const modFolderId = await getOrCreateFolder(drive, mod, envFolderId, false);
                console.log(`  │    ├── Module [${mod}]: ${modFolderId}`);
            }
        }

        console.log('\n✅ KHỞI TẠO THÀNH CÔNG! Hãy copy vào file .env Backend:');
        console.log('---');
        console.log(envVariables.join('\n'));
        console.log('---');

    } catch (error) {
        console.error('❌ Lỗi kết nối Google Drive API:', error.message);
        if (error.status === 404) {
            console.error('   → Kiểm tra SHARED_DRIVE_ID có đúng không? Service Account có được add vào Shared Drive chưa?');
        }
    }
}

/**
 * Tìm thư mục (chống tạo trùng). Nếu không tìm thấy → Tạo mới.
 * @param {*} drive - Drive client
 * @param {string} folderName - Tên thư mục
 * @param {string|null} parentId - ID thư mục/drive cha
 * @param {boolean} isRoot - true nếu đây là thư mục gốc (parent là Shared Drive ID)
 */
async function getOrCreateFolder(drive, folderName, parentId, isRoot) {
    let query = `mimeType='application/vnd.google-apps.folder' and name='${folderName}' and trashed=false`;

    if (isRoot && SHARED_DRIVE_ID) {
        query += ` and '${SHARED_DRIVE_ID}' in parents`; // Tìm trong Shared Drive root
    } else if (parentId) {
        query += ` and '${parentId}' in parents`;
    }

    const listParams = {
        q: query,
        fields: 'files(id, name)',
        spaces: 'drive',
        ...SHARED_DRIVE_PARAMS,              // Merge Shared Drive params nếu có
    };

    const response = await drive.files.list(listParams);
    const files = response.data.files || [];

    if (files.length > 0) {
        // ⚠️ Cảnh báo trùng tên (Drive cho phép nhiều folder cùng tên — xem google-drive-limits.md)
        if (files.length > 1) {
            console.warn(`  ⚠️  Phát hiện ${files.length} folders trùng tên '${folderName}' — Đang dùng cái đầu tiên.`);
        }
        return files[0].id; // Dùng lại ID đã có
    }

    // Tạo mới
    const createParams = {
        requestBody: {
            name: folderName,
            mimeType: 'application/vnd.google-apps.folder',
            parents: [isRoot && SHARED_DRIVE_ID ? SHARED_DRIVE_ID : parentId].filter(Boolean),
        },
        fields: 'id',
        supportsAllDrives: !!SHARED_DRIVE_ID,
    };

    const folder = await drive.files.create(createParams);
    return folder.data.id;
}

initializeWorkspace();
