/**
 * Boilerplate: Trải nghiệm Stream IO & Upload File lên Google Drive/S3
 * 
 * Target: Dùng cho AI Agent copy logic "Stream an toàn không gây OOM".
 * Context: NestJS/ExpressJS có multer/busboy.
 * 
 * Bài toán: 
 * Người dùng upload file. Tuyệt đối không lưu biến vào Buffer. 
 * Pipe trực tiếp Request Stream Header => Node.js PassThrough => Google Drive APIs.
 */

const { google } = require('googleapis');
const stream = require('stream');
const crypto = require('crypto');
// const { validateMagicBytes } = require('./...your/security/utils'); // Giả lập hàm Validate bytes

/**
 * Service chuẩn OOM-Safe Upload Google Drive
 * AI Agent Copy code này vào Controller/Service tương ứng.
 * 
 * @param {ReadStream} incomingDataStream Luồng stream data từ user (VD via Busboy nodejs)
 * @param {Object} fileInfo Metadata file (Tên, MineType bị Client fake, Size)
 * @param {String} parentFolderId Mục tiêu nhét file 
 * @returns {Object} Database_Row chuẩn (DB Record)
 */
async function uploadToCloudSafelyStream(incomingDataStream, fileInfo, parentFolderId) {
    // 1. Tạo Service Account Auth (Tốt nhất inject từ Dependency Injection)
    const auth = new google.auth.GoogleAuth({
        scopes: ['https://www.googleapis.com/auth/drive'],
        // Trong Web App ko dùng file json cứng, hãy Parse từ ENV
        credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON)
    });
    const drive = google.drive({ version: 'v3', auth });

    // 2. Chống tên giả mạo & ghi đè (Tiêu chuẩn tài liệu folder-structure.md)
    const uuid = crypto.randomUUID();
    const fileExt = fileInfo.fileName.substring(fileInfo.fileName.lastIndexOf('.')) || '';
    const safeFilename = `${uuid}${fileExt}`; // Trái tim của File Naming Convention

    // Tuyến tuỷ chặn mã độc (Option Security)
    // Thực tế cần đọc 4KB stream đầu tiên truyền lên để check MagicBytes, sau đó ghép lại đẩy tiếp.

    // 3. Chuẩn bị Stream ảo (Cho phép điều hướng dữ liệu mà Google APIs đọc được)
    const passThrough = new stream.PassThrough();
    incomingDataStream.pipe(passThrough);

    console.log(`[Upload-Task] Bắt đầu stream ID: ${safeFilename}...`);

    try {
        // 4. Gọi API luồng (Singular Upload nhưng xài Stream Payload)
        const response = await drive.files.create({
            requestBody: {
                name: safeFilename, // File Naming an toàn
                parents: [parentFolderId],
                // Lưu lịch sử / thông tin truy vết người đăng lên thuộc tính Metadata
                appProperties: { uploaded_by: 'Internal_System' }
            },
            media: {
                mimeType: fileInfo.mimeType,  // Khai báo Web MIME type
                body: passThrough             // <--- Tuyệt đối phải đẩy STREAM vào đây, không phải BUFFER Buffer.from()!
            },
            // Giới hạn fields trả về để tiết kiệm Traffic
            fields: 'id, name, size, mimeType, webContentLink'
        });

        console.log(`[Upload-Task] ✅ Xong. Google File ID: ${response.data.id}`);

        // Truyền về định dạng chuẩn lưu Database 
        // AI Agent phải lưu được Object này vào bảng media_files
        return {
            id: uuid,                            // Hệ thống Local Query nhanh P0
            cloud_file_id: response.data.id,     // ID đối chiếu trên mây
            original_name: fileInfo.fileName,    // Tên cũ của người dùng (tự do)
            provider: 'GOOGLE_DRIVE',
            mime_type: fileInfo.mimeType,
            size_bytes: parseInt(response.data.size || '0', 10),
            raw_download_url: response.data.webContentLink // (Tùy ACL thiết lập)
        };

    } catch (error) {
        console.error(`[Upload-Task] ❌ Chết OOM hoặc Lỗi Google API:`, error.message);
        throw new Error('Upload Failed. Could not stream to Drive.');
    }
}

// Module Export cho AI Agent
module.exports = { uploadToCloudSafelyStream };
