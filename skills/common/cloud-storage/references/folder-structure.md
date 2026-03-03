# Naming & Structure Standards for Cloud Storage

Tài liệu này định nghĩa các tiêu chuẩn bắt buộc (P0) khi tổ chức và định danh file/folder trên các nền tảng Cloud Storage (Google Drive, AWS S3, Azure Blob). 
Mục tiêu: Đảm bảo khả năng tra cứu siêu tốc (O(1)), tránh đụng độ tên (collision), không rò rỉ thông tin nhạy cảm và ngăn chặn việc chạm ngưỡng giới hạn số lượng con (children limit) của thư mục cấp cha.

## 1. Quy tắc Phân vùng (Partitioning Rules)

Tuyệt đối KHÔNG lưu trữ toàn bộ file vào chung một cấp thư mục (Root Directory). Việc này gây nghẽn hiệu suất khi List/Search và vi phạm giới hạn thư mục của nhiều dịch vụ lưu trữ.

### Cấu trúc Chuẩn (Bắt buộc)
Folder Path phải tuân theo cấu trúc phân rã thời gian và module như sau:
`[Vùng_Môi_Trường] / [Tên_Module] / [Năm] / [Tháng] / [Loại_Bảo_Mật]`

**Ví dụ trực quan:**
```text
S3_Bucket_Or_Drive_Root/
├── dev/                            # Phân tách cứng theo Môi trường (dev, uat, prod)
│   ├── user_avatars/               # Phân tách theo Business Module
│   │   └── 2026/                   # Phân tách theo Năm
│   │       ├── 01/                 # Phân tách theo Tháng (01-12)
│   │       │   └── public/         # Quyền truy cập: Bất kỳ ai cũng có thể đọc
│   │       └── 02/
│   │           └── public/
│   └── contract_documents/
│       └── 2026/
│           ├── 01/
│           │   └── private/        # Quyền truy cập: Chỉ user có auth token mới được đọc
│           └── 02/
│               └── private/
└── prod/                           # Không bao giờ nhầm lẫn file giữa dev và prod
    └── ...
```

### 🚫 Anti-Patterns (Tuyệt đối tránh)
❌ `Root / tat_ca_ho_so_kem_theo /` (1 thư mục chứa hàng triệu file).
❌ `Root / User_123 /` (Tạo thư mục riêng cho từng User khiến số lượng thư mục tăng không kiểm soát).

---

## 2. Quy tắc Định danh File (File Naming Conventions)

Tên file upload từ phía Client gửi lên luôn TRONG TÌNH TRẠNG KHÔNG ĐÁNG TIN CẬY (Unsafe). Yêu cầu chuẩn hóa hoàn toàn tên file trước khi lưu trữ vào Cloud.

### Chuẩn Format
Quy định đổi tên tệp (Rename) theo chuẩn:
`[Prefix]_[UUID_or_ULID].[mở_rộng_gốc]` hoặc `[UUID]_[Custom_Slug].[ext]`

**Luật thực thi:**
1. Giữ lại phần Extension (VD: `.pdf`, `.jpg`).
2. Sinh mã `UUID v4` hoặc `ULID` (ưu tiên dạng sortable) thay thế tên gốc.
3. Nếu business cần lưu lại tên gốc vào file (cho mục đích SEO/Human Readable), phải xử lý "Slugify" (bỏ dấu tiếng Việt, thay khoảng trắng/ký tự đặc biệt bằng dấu gạch ngang `-`).

**Ví dụ:**
- File gốc: `Hợp đồng Mua bán xe #123!@.pdf`
- ❌ **Sai:** `Hợp đồng Mua bán xe #123!@.pdf` (Lỗi URL encoding, lỗi Unicode).
- ❌ **Sai:** `hop-dong.pdf` (Dễ bị ghi đè nếu user khác cũng upload file tên này).
- ✅ **Chuẩn an toàn nhất:** `123e4567-e89b-12d3-a456-426614174000.pdf`
- ✅ **Chuẩn cần SEO:** `123e4567-e89b-12d3-a456-426614174000_hop-dong-mua-ban-xe-123.pdf`

---

## 3. Metadata Mapping (Thiết kế Cơ sở Dữ liệu)

Ngăn chặn việc gọi API list files của Cloud provider để làm chức năng tìm kiếm. Mọi thao tác Search/Filter phải chạy trên Database nội bộ.

### Bắt buộc thiết kế Table `media_files` hoặc `attachments`:

| Field Name | Type | Description | Indexing |
| :--- | :--- | :--- | :--- |
| `id` | UUID | Khóa chính của DB nội bộ | Primary Key |
| `cloud_file_id` | String | ID do Cloud cấp trả về (VD Google Drive File ID hoặc File Path trên S3) | Indexed |
| `original_name` | String | Tên nguyên thủy để hiển thị trả lại cho người dùng cuối | Không |
| `storage_path` | String | Đường dẫn tương đối lưu trên Cloud: `prod/avatars/2026/02/private/uuid.png` | Indexed |
| `mime_type` | String | Loại file thực tế đã validate (VD: `application/pdf`) | Không |
| `size_bytes` | Integer | Dung lượng byte thực | Không |
| `provider` | String | Enum: `GOOGLE_DRIVE`, `AWS_S3`, `LOCAL` (Để sẵn sàng mở rộng multi-cloud) | Indexed |
| `upload_status` | String | Enum: `PENDING`, `UPLOADING`, `COMPLETED`, `FAILED` | Indexed |

### Quy trình State Machine cho Upload:
1. `PENDING`: Hệ thống nhận Request từ Client, init Row trong DB.
2. `UPLOADING`: Chuẩn bị Stream dữ liệu lên Cloud.
3. `COMPLETED`: Cloud báo OK, nhận `cloud_file_id`, update Row, hoàn tất CSDL.

### Lợi ích:
- Xóa file: Đổi cờ `deleted_at` trong MySql/Postgre thay vì phải gọi lệnh Delete lên Cloud ngay lập tức (Xử lý dọn rác bất đồng bộ qua Cronjob - Soft Delete).
- Phục vụ API truy xuất cực nhanh: Trả về link download từ Local DB mà không tốn API quota của Cloud.
