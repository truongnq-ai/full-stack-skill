/**
 * OAuth2 Authorization (Chạy 1 lần duy nhất)
 *
 * Script này sẽ:
 * 1. Mở trình duyệt để anh đăng nhập Google và cho phép quyền Drive
 * 2. Bắt Authorization Code trả về tại http://localhost:3000
 * 3. Lưu token (access_token + refresh_token) vào token.json
 *
 * Sau khi có token.json, tất cả scripts khác sẽ chạy tự động không cần đăng nhập lại.
 *
 * Cách chạy:
 *   node oauth2_authorize.js
 */

const { google } = require('googleapis');
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const CREDENTIALS_FILE = path.join(__dirname, 'client_secret.json');
const TOKEN_FILE = path.join(__dirname, 'token.json');
const REDIRECT_PORT = 3000;
const REDIRECT_URI = `http://localhost:${REDIRECT_PORT}`;

// Scopes cần thiết: Đọc + Ghi toàn bộ Drive
const SCOPES = [
    'https://www.googleapis.com/auth/drive',
];

async function authorize() {
    // 1. Kiểm tra file credentials
    if (!fs.existsSync(CREDENTIALS_FILE)) {
        console.error('❌ Không tìm thấy client_secret.json trong thư mục scripts/');
        console.error('   → Hãy copy file credentials vào: ', CREDENTIALS_FILE);
        process.exit(1);
    }

    if (fs.existsSync(TOKEN_FILE)) {
        console.log('ℹ️  token.json đã tồn tại. Kiểm tra token còn hợp lệ không...');
        const tokenData = JSON.parse(fs.readFileSync(TOKEN_FILE, 'utf-8'));
        if (tokenData.refresh_token) {
            console.log('✅ token.json hợp lệ (có refresh_token). Không cần authorize lại.');
            console.log('   → Chạy ngay: node audit_drive_structure.js');
            return;
        }
        console.log('⚠️  token.json không có refresh_token. Tiến hành authorize lại...\n');
    }

    const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_FILE, 'utf-8'));
    const { client_id, client_secret } = credentials.installed || credentials.web;

    const oauth2Client = new google.auth.OAuth2(client_id, client_secret, REDIRECT_URI);

    // 2. Tạo URL để anh click vào authorize
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',     // offline = lấy refresh_token, dùng mãi không cần login lại
        scope: SCOPES,
        prompt: 'consent',          // Bắt buộc show consent để lấy refresh_token
    });

    console.log('🌐 Đang mở trình duyệt để xác thực Google Drive...');
    console.log('   Nếu trình duyệt không mở tự động, hãy copy link này:\n');
    console.log(authUrl);
    console.log();

    // Mở trình duyệt tự động (Windows)
    exec(`start "" "${authUrl}"`);

    // 3. Khởi động HTTP server tạm để bắt callback code
    const code = await waitForAuthCode();

    // 4. Đổi code lấy tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // 5. Lưu token.json
    fs.writeFileSync(TOKEN_FILE, JSON.stringify(tokens, null, 2));

    console.log('\n✅ Xác thực thành công! token.json đã được lưu.');
    console.log('   → Bước tiếp theo: node audit_drive_structure.js');
}

function waitForAuthCode() {
    return new Promise((resolve, reject) => {
        const server = http.createServer((req, res) => {
            try {
                const queryParams = url.parse(req.url, true).query;

                if (queryParams.error) {
                    res.end('<h1>❌ Xác thực thất bại. Đóng tab này và thử lại.</h1>');
                    server.close();
                    reject(new Error(queryParams.error));
                    return;
                }

                if (queryParams.code) {
                    res.end(`
            <h1>✅ Xác thực Google Drive thành công!</h1>
            <p>Bạn có thể đóng tab này. Quay lại terminal để tiếp tục.</p>
          `);
                    server.close();
                    resolve(queryParams.code);
                }
            } catch (err) {
                reject(err);
            }
        });

        server.listen(REDIRECT_PORT, () => {
            console.log(`🔌 Đang lắng nghe callback tại http://localhost:${REDIRECT_PORT}...`);
        });

        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                console.error(`❌ Port ${REDIRECT_PORT} đang bận. Tắt ứng dụng đang dùng port này rồi thử lại.`);
            }
            reject(err);
        });

        // Timeout sau 5 phút
        setTimeout(() => {
            server.close();
            reject(new Error('Timeout: Không nhận được xác thực trong 5 phút.'));
        }, 5 * 60 * 1000);
    });
}

authorize().catch(err => {
    console.error('\n❌ Lỗi:', err.message);
    process.exit(1);
});
