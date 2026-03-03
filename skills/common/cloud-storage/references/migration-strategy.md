# Migration Strategy: Tái cấu trúc Google Drive an toàn

Tài liệu này quy định quy trình bắt buộc khi di chuyển, đổi tên, và tái cấu trúc dữ liệu hiện có trên Google Drive về đúng chuẩn đã định nghĩa trong `folder-structure.md`.

## Nguyên tắc Tối thượng

> **Không bao giờ được thực thi Migration trực tiếp mà không có Dry Run trước.**
> Mọi thao tác phải có khả năng Rollback trong 30 ngày (Soft Migration, không Hard Delete).

---

## Quy trình 3 Bước Bắt buộc

```
Bước 1: AUDIT     → Quét Drive, hiểu hiện trạng, sinh báo cáo
Bước 2: DRY RUN   → Tính toán migration plan, xem trước sẽ làm gì (không đụng đến file)
Bước 3: EXECUTE   → Sau khi xác nhận plan, thực thi di chuyển thật
```

---

## Bước 1: AUDIT — Chạy `audit_drive_structure.js`

**Mục tiêu:** Hiểu hiện trạng trước khi làm bất cứ điều gì.

Script sẽ sinh ra file `audit_report.csv` với các thông tin:
- Tổng số files / folders
- Files đúng chuẩn vs vi phạm chuẩn đặt tên
- Files trùng tên (Duplicate Detection)
- Phân bổ MIME type (loại file nào chiếm nhiều nhất)
- Files kích thước 0 byte (Empty files)

```bash
node audit_drive_structure.js
# Output: audit_report_2026-03-03.csv
```

---

## Bước 2: DRY RUN — Chạy `dry_run_migration.js`

**Mục tiêu:** Kiểm tra plan migration đúng chưa trước khi execute.

Script đọc từ cấu hình `migration.config.json` và in ra:
- File nào sẽ được MOVE đến đâu
- File nào sẽ được RENAME thành gì
- File nào sẽ bị chuyển vào `unsorted/` (không xác định module)
- Tổng số thao tác cần thực hiện

```bash
node dry_run_migration.js
# Output: dry_run_plan_2026-03-03.json (để đọc review)
```

---

## Bước 3: EXECUTE — Chạy `migrate_to_standard.js`

**Mục tiêu:** Thực thi plan đã được xác nhận.

```bash
# Bắt buộc: Truyền file plan đã review từ bước Dry Run
PLAN_FILE=dry_run_plan_2026-03-03.json node migrate_to_standard.js
```

Script sẽ:
1. Đọc plan từ file JSON (không tự tính lại để đảm bảo execute đúng những gì đã review)
2. MOVE file (không Copy + Delete — để bảo toàn Google Drive Revision history)
3. Cập nhật `appProperties` của file với metadata migration
4. Ghi log chi tiết vào `migration_log_[timestamp].json`
5. Files cũ KHÔNG bị xóa — chỉ được move. Cronjob mới xóa sau 30 ngày.

---

## File cấu hình: `migration.config.json`

```json
{
  "sourceRootFolderId": "FOLDER_ID_HIEN_TAI",
  "targetRootFolderId": "FOLDER_ID_CHUAN_MOI",
  "environment": "prod",
  "sharedDriveId": null,
  "moduleMapping": {
    "avatar": "avatars",
    "profile_pic": "avatars",
    "invoice": "invoices",
    "contract": "documents",
    "hop_dong": "documents"
  },
  "allowedMimeTypes": [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ],
  "unknownFileStrategy": "unsorted",
  "dryRunOnly": false
}
```
