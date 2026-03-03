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

// Cấu hình Cây thư mục cần khởi tạo
// ➡️ Chỉnh sửa mảng modules theo nghiệp vụ dự án của bạn
const WORKSPACE_TREE = {
    rootName: 'MY_PROJECT_STORAGE_ROOT',
    environments: ['dev', 'uat', 'prod'],
    modules: ['avatars', 'documents', 'invoices', 'temp']
};

// Chế độ: Shared Drive (nếu có env) hoặc My Drive
const SHARED_DRIVE_ID = process.env.SHARED_DRIVE_ID || null;

// Đường dẫn File Service Account JSON — KHÔNG BAO GIỜ PUSH LÊN GIT
const CREDENTIALS_PATH = path.join(__dirname, 'credentials.json');

// Params bắt buộc để làm việc với Shared Drive (xem references/google-drive-limits.md)
const SHARED_DRIVE_PARAMS = SHARED_DRIVE_ID
    ? { supportsAllDrives: true, includeItemsFromAllDrives: true, corpora: 'drive', driveId: SHARED_DRIVE_ID }
    : {};

async function initializeWorkspace() {
    if (!fs.existsSync(CREDENTIALS_PATH)) {
        console.error(`❌ Không tìm thấy '${CREDENTIALS_PATH}'. Tải Service Account JSON từ Google Cloud Console.`);
        process.exit(1);
    }

    const auth = new google.auth.GoogleAuth({
        keyFile: CREDENTIALS_PATH,
        scopes: ['https://www.googleapis.com/auth/drive'],
    });
    const drive = google.drive({ version: 'v3', auth });

    const mode = SHARED_DRIVE_ID ? `Shared Drive (ID: ${SHARED_DRIVE_ID})` : 'My Drive';
    console.log(`🚀 Kết nối Service Account — Mode: ${mode}`);

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
