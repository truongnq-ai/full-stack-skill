/**
 * Shared Auth Helper
 *
 * Tự động phát hiện loại credentials và trả về Drive client đã xác thực.
 * Hỗ trợ 2 chế độ:
 *   - OAuth2 (Installed App): Dùng token.json (cá nhân, My Drive)
 *   - Service Account: Dùng credentials.json (tổ chức, Shared Drive)
 *
 * Thứ tự ưu tiên: token.json > credentials.json
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const TOKEN_FILE = path.join(__dirname, 'token.json');
const SERVICE_ACCOUNT_FILE = path.join(__dirname, 'credentials.json');
const CLIENT_SECRET_FILE = path.join(__dirname, 'client_secret.json');

/**
 * Trả về Google Drive v3 client đã xác thực
 * @returns {import('googleapis').drive_v3.Drive}
 */
async function getDriveClient() {
    // Ưu tiên OAuth2 (token.json) — dùng cho My Drive cá nhân
    if (fs.existsSync(TOKEN_FILE) && fs.existsSync(CLIENT_SECRET_FILE)) {
        return buildOAuth2Client();
    }

    // Fallback: Service Account — dùng cho Shared Drive tổ chức
    if (fs.existsSync(SERVICE_ACCOUNT_FILE)) {
        return buildServiceAccountClient();
    }

    console.error('❌ Không tìm thấy credentials.');
    console.error('   OAuth2: Chạy "node oauth2_authorize.js" trước.');
    console.error('   Service Account: Đặt credentials.json vào thư mục scripts/.');
    process.exit(1);
}

async function buildOAuth2Client() {
    const credentials = JSON.parse(fs.readFileSync(CLIENT_SECRET_FILE, 'utf-8'));
    const { client_id, client_secret } = credentials.installed || credentials.web;
    const redirectUri = 'http://localhost:3000';

    const oauth2Client = new google.auth.OAuth2(client_id, client_secret, redirectUri);
    const tokens = JSON.parse(fs.readFileSync(TOKEN_FILE, 'utf-8'));
    oauth2Client.setCredentials(tokens);

    // Tự động refresh token khi hết hạn và lưu lại
    oauth2Client.on('tokens', (newTokens) => {
        const existing = JSON.parse(fs.readFileSync(TOKEN_FILE, 'utf-8'));
        const merged = { ...existing, ...newTokens };
        fs.writeFileSync(TOKEN_FILE, JSON.stringify(merged, null, 2));
        console.log('🔄 Access token đã được refresh và lưu lại.');
    });

    return google.drive({ version: 'v3', auth: oauth2Client });
}

async function buildServiceAccountClient() {
    const auth = new google.auth.GoogleAuth({
        keyFile: SERVICE_ACCOUNT_FILE,
        scopes: ['https://www.googleapis.com/auth/drive'],
    });
    return google.drive({ version: 'v3', auth });
}

module.exports = { getDriveClient };
