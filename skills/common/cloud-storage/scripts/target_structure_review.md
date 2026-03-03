# Cấu trúc Google Drive Mới (Review)

Theo yêu cầu của anh, đây là cấu trúc đích sẽ hình thành sau khi migrate. 
*Lưu ý: System folders của Google (Takeout, Photos...) vẫn nằm nguyên ở thư mục gốc (Root) và không bị ảnh hưởng.*

```text
Google Drive Root
│
├── Google Photos/               (Bỏ qua - Không đụng tới)
├── Takeout/                     (Bỏ qua - Không đụng tới)
├── MoneyManager/                (Bỏ qua - Không đụng tới)
├── LabanKey/                    (Bỏ qua - Không đụng tới)
├── Google "két"/                (Bỏ qua - Không đụng tới)
│
└── personal_workspace/          🆕 (Thư mục chuẩn hóa mới)
    │
    ├── documents/               (Tài liệu từ: 05.Document, 00.MindMap, 04.Company)
    │   ├── [UUID]_tai-lieu-1.pdf
    │   └── [UUID]_bao-cao.docx
    │
    ├── media/                   (Hình ảnh, video từ: 02.Entertainment, 09.Youtube)
    │   └── [UUID]_video-giai-tri.mp4
    │
    ├── private/                 (Cá nhân từ: 01.Personal, 00.khan)
    │   └── [UUID]_cmnd.jpg
    │
    ├── setups/                  (Cài đặt từ: 03.Setup)
    │   └── [UUID]_tool.exe
    │
    └── unsorted/                (Các file lẻ tẻ nằm ngoài danh mục trên)

```

---

## 🗑️ Dữ liệu sẽ Bị Xóa (Đưa vào Thùng Rác)

Dựa trên yêu cầu của anh, script sẽ thực hiện action `TRASH` (xóa mềm vào thùng rác, có thể khôi phục trong 30 ngày) đối với:

1. **Toàn bộ thư mục `@Book`** (Sách sẽ bị xóa hoàn toàn).
2. **Mã nguồn và file tạm trong thư mục `04.Company`**:
   - Bất kỳ file nào có đường dẫn chứa `.git/` (Git objects, history).
   - Các file code (`.js`, `.java`, `.py`, `.html`, `.css`, `application/octet-stream` không xác định).
   - *Chỉ giữ lại:*(`.pdf`, `.docx`, `.xlsx`, hình ảnh thiết kế) và gom vào `personal_workspace/documents/`.

---

## 🚀 Kế hoạch thực thi (Đã tùy chỉnh Script)

Em đã nâng cấp `dry_run_migration.js` và cấu hình để hỗ trợ hành động **Xóa (TRASH)**.
Anh cấp thông tin `SOURCE_FOLDER_ID` (Root cũ) là em có thể chạy `dry_run_migration.js` để in ra file kế hoạch (chưa xóa thật) cho anh xem thử file nào sẽ bay màu, file nào được giữ lại.
