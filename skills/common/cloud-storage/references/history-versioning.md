# File History & Versioning Strategies

Tài liệu này cung cấp các tiêu chuẩn (P0) khi đối mặt với nghiệp vụ Xóa (Delete) và Cập nhật (Update) file trên Cloud Storage. 

Nguyên tắc tối thượng: Dữ liệu bị xóa không thể khôi phục là Lỗi Nghiêm Trọng. Mọi hành động hủy/ghi đè file đều phải để lại đường lui (Fallback/Rollback).

## 1. Soft Delete & Trash Pattern (Xóa Mềm)

Lập trình viên và AI Agent KHÔNG bao giờ được gọi API xóa vĩnh viễn (`Hard Delete`) tệp tin ngay khi người dùng bấm nút Xóa.

### 🚫 Anti-Pattern: Xóa thẳng lên Cloud
```javascript
// ❌ Gọi lệnh xóa này trên s3/drive sẽ khiến dữ liệu bốc hơi ngay lập tức
await s3.deleteObject({ Bucket: 'files', Key: 'user_avatar.jpg' }).promise();
```

### ✅ Best Practice: Đánh dấu xóa (Soft Delete)
```sql
-- Chỉ cập nhật cờ trên Database nội bộ
UPDATE media_files SET deleted_at = CURRENT_TIMESTAMP WHERE id = 'uuid-123';
```

**Quy trình chuẩn hóa:**
1. Khi có lệnh xóa, ẩn trên UI và đánh dấu `deleted_at = TRUE` ở Local Database.
2. (Đối với Google Drive): Move file đó vào thùng rác (Trashing).
   ```javascript
   // Chuyển file Google Drive vào Trash thay vì xóa vĩnh viễn
   await drive.files.update({ fileId: '123...', requestBody: { trashed: true } });
   ```
3. Lập lịch Cronjob/Background Job (VD: Chạy lúc 2h sáng). Quét các record trong DB đã xóa quá 30 ngày (Time-to-Live = 30 days) -> Tiến hành gọi Hard Delete API thực sự lên Cloud để dọn dẹp dung lượng.

---

## 2. Quản lý Phiên bản (Versioning & Revisions)

Khi người dùng upload phiên bản mới của cùng một file (VD: Cập nhật lại bản CV, Hợp đồng), hệ thống cần kiểm soát để không làm mất file cũ.

### 🔄 Cách 1: Versioning trên AWS S3
Bật tính năng `Bucket Versioning` ngay từ đầu trên AWS Console.
Khi dùng SDK upload đè file trùng `Key` (đường dẫn), S3 tự động gán sinh một `VersionId` mới. Trạng thái cũ được bảo toàn.
- Cột trong DB cần thêm: `cloud_version_id`.

### 📝 Cách 2: Revisions API trên Google Drive
Google Drive hỗ trợ tính năng **Revisions (Lịch sử chỉnh sửa)** cho cùng một `FileId`.
Khi muốn Ghi đè file/Cập nhật file hiện tại bằng nội dung mới, không cần xóa file cũ, hãy gọi API `update` nội dung của chính file đó:

```javascript
// ✅ Cập nhật nội dung giữ nguyên File ID và tạo 1 Revision mới trong lịch sử
await drive.files.update({
  fileId: 'EXISTING_CLOUD_ID',
  media: {  /* Stream nội dung của file cấu hình mới */ },
  // requestBody không truyền name (để giữ nguyên tên trên mây)
});
```
- Lợi ích: Lấy lại file cũ thông qua giao diện Web Google Drive hoặc API (`drive.revisions.list`) bất cứ lúc nào.
- Trả về ngay lập tức nếu file này bị sai định dạng.

---

## 3. Audit Logging (Gắn nhãn giám sát File)

Để kiểm soát việc ai (User nào, IP nào) tải lên hoặc sửa nội dung của file đặc biệt trên Cloud:

- **Google Drive Properties:** Dùng `appProperties` (nhãn ngầm ẩn) hoặc `description` của file để nhúng Custom JSON.
- **AWS S3 Object Tags:** Gắn Tag cho File.

```javascript
// Gắn thẳng vết Audit vào file trên Google Drive
await drive.files.update({
  fileId: 'cloud-file-id',
  requestBody: {
    appProperties: {
      uploadedBy: 'user-uuid-1234',
      systemSource: 'web-portal-v2'
    }
  }
});
```
