# Cloud Storage Scripts

Các utility script hỗ trợ tích hợp Google Drive. Được thiết kế để AI Agent và developers có thể chạy trực tiếp hoặc tham chiếu code khi cần.

## ⚙️ Yêu cầu Trước Khi Chạy

1. **Node.js >= 18.0.0** — Kiểm tra: `node --version`
2. **Cài dependencies:**
   ```bash
   npm install
   ```

## 🔑 Thiết lập Service Account

1. Truy cập [Google Cloud Console](https://console.cloud.google.com/).
2. Vào `IAM & Admin` → `Service Accounts` → Tạo Service Account mới.
3. Cấp quyền **Editor** hoặc tạo Custom Role với `drive.files.*`.
4. Tải file `credentials.json` (JSON Key) về thư mục này.
5. **TUYỆT ĐỐI KHÔNG push `credentials.json` lên Git.** File `.gitignore` phải chứa entry `credentials.json`.

Nếu dùng Shared Drive: Vào Shared Drive → Settings → Manage Members → Add Service Account email với quyền **Content Manager**.

---

## 📜 Danh sách Script

### `init_google_drive_folder_structure.js`
Khởi tạo cây thư mục chuẩn trên Google Drive theo quy chuẩn `references/folder-structure.md`.

**Chạy với My Drive (dev/test):**
```bash
node init_google_drive_folder_structure.js
```

**Chạy với Shared Drive (production):**
```bash
SHARED_DRIVE_ID=your_shared_drive_id node init_google_drive_folder_structure.js
```

Sau khi chạy thành công, script sẽ in ra các `FOLDER_ID` để dán vào file `.env` của Backend.

---

### `upload_stream_boilerplate.js`
Boilerplate code minh họa pattern streaming upload an toàn (Zero Buffer — không gây OOM).

Tham khảo code trong file này khi viết API upload cho bất kỳ Backend framework nào (NestJS, Express, Laravel, Spring Boot).

---

## 📚 Tài liệu Tham chiếu
- [Cấu trúc thư mục & Đặt tên](../references/folder-structure.md)
- [Chiến lược Upload](../references/upload-strategies.md)
- [Giới hạn & Gotchas của Drive](../references/google-drive-limits.md)
- [Xử lý Lỗi](../references/error-handling.md)
