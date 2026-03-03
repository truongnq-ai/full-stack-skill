# Google Drive Limits, Quotas & Critical Behaviors

Tài liệu này liệt kê các giới hạn thực tế của Google Drive API và những hành vi đặc thù (gotchas) mà AI Agent **BẮT BUỘC** phải nắm trước khi viết code tích hợp.

## 1. Giới hạn Quan trọng (Hard Limits)

| Thực thể | Giới hạn | Hệ quả nếu vi phạm |
| :--- | :--- | :--- |
| Files trong 1 folder | ~500.000 items | List API chậm, timeout, UI Drive bị đơ |
| API Requests | 12.000 req/phút / Project | `403 rateLimitExceeded` — nghẽn batch upload |
| Revisions của 1 file | 200 revisions | Drive tự xóa revision cũ nhất (Silent data loss) |
| File upload 1 lần | 5 MB (simple), 5 TB (resumable) | Upload >5MB phải dùng Resumable Upload |
| Export Google Docs | 10 MB (PDF/Docx) | Docs lớn hơn không export được, cần chia nhỏ |
| Shared Drive members | 600 thành viên trực tiếp | Phải dùng Group, không add member thủ công |

---

## 2. ⚠️ Gotcha Cực Kỳ Quan Trọng: File Trùng Tên

> **Google Drive cho phép nhiều file/folder trùng tên tồn tại song song trong cùng 1 thư mục.**
> Đây là hành vi HOÀN TOÀN KHÁC với filesystem thông thường (OS sẽ ghi đè hoặc báo lỗi).

### Hậu quả:
- Query bằng tên: `name='invoice.pdf'` có thể trả về **nhiều files cùng tên**.
- Hàm `getOrCreateFolder(drive, 'avatars', parentId)` nếu chạy song song 2 lần → Tạo ra 2 folder `avatars` trùng nhau → Gây bug chia sẻ dữ liệu.

### ✅ Cách phòng tránh:
1. **Tuyệt đối KHÔNG lookup file bằng tên.** Chỉ lookup bằng `fileId` được lưu trong DB nội bộ.
2. Khi tạo folder (idempotent init): Sau khi tìm kiếm nếu thấy nhiều hơn 1 kết quả → Log cảnh báo và chọn kết quả đầu tiên có `mimeType = folder`.
3. Dùng `driveId` + `fileId` làm Primary Key khi làm việc với Shared Drive.

---

## 3. My Drive vs Shared Drive (Team Drive) — Chọn Cái Nào?

| Tiêu chí | My Drive (Service Account) | Shared Drive (Workspace) |
| :--- | :--- | :--- |
| **Dung lượng** | 15 GB miễn phí | Không giới hạn (theo plan trả phí) |
| **Ownership** | Thuộc về Service Account | Thuộc về tổ chức (không mất khi xóa user) |
| **Phù hợp** | Dev/Test, POC | Production, dữ liệu doanh nghiệp |
| **API params bắt buộc** | Không cần thêm | `supportsAllDrives: true` + `includeItemsFromAllDrives: true` |
| **Risk** | Mất file nếu SA bị xóa/vô hiệu hóa | An toàn hơn — file thuộc Org |

### ✅ Quy tắc bắt buộc khi dùng Shared Drive:
Tất cả API calls phải có thêm params sau, nếu không sẽ bị `404 File Not Found`:
```javascript
// Thêm vào MỌI request khi làm việc với Shared Drive
const params = {
  supportsAllDrives: true,           // Bắt buộc
  includeItemsFromAllDrives: true,   // Bắt buộc cho list/search
  driveId: process.env.SHARED_DRIVE_ID,  // ID của Shared Drive
  corpora: 'drive'                   // Scope tìm kiếm trong Shared Drive
};
```
