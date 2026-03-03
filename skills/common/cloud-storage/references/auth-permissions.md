# Authentication & Access Permissions

Tài liệu này định nghĩa các tiêu chuẩn về cấp quyền truy cập, chia sẻ và bảo vệ file trên nền tảng Cloud Storage (Google Drive, AWS S3). 

Trọng tâm: Đảm bảo không lộ lọt dữ liệu nội bộ, không dùng sai phương thức xác thực và quản lý linh hoạt quyền đọc/tải file cho End-user.

## 1. Lựa chọn Phương thức Xác thực (Google Drive)

AI Agent khi code tích hợp Google Drive BẮT BUỘC phải phân rạch ròi 2 use case sau để chọn loại Credentials:

### 🤖 Service Account (Máy chủ tự quản lý - Ưu tiên P0)
**Sử dụng khi:** Lưu trữ file của hệ thống (Avatar, CMND/CCCD, Hóa đơn hệ thống sinh ra).
- Người dùng không cần login tài khoản Google.
- Backend tự dùng `credentials.json` (Service Account Key) để upload vào "App Folder".
- Quota (Giới hạn lưu trữ) tính vào tài khoản của doanh nghiệp/tổ chức.

### 👤 OAuth 2.0 (Khách hàng tự quản lý - Ưu tiên P2)
**Sử dụng khi:** Trích xuất, sao lưu dữ liệu cá nhân của người dùng (VD: "Lưu báo cáo này vào Google Drive của tôi").
- Người dùng phải trải qua luồng Consent Screen, cấp quyền `https://www.googleapis.com/auth/drive.file`.
- Backend lưu trữ Refresh Token vào Database để lấy Access Token mỗi khi cần.
- Quota tính trực tiếp vào 15GB miễn phí của End-user.

---

## 2. Quản lý Truy cập (Presigned URLs & Signed Links)

Tuyệt đối KHÔNG cấu hình chức năng "Bất kỳ ai có liên kết đều có thể xem" (Public Link) cho các thư mục chứa dữ liệu người dùng (Hợp đồng, Avatar).

### ✅ Best Practice: Temporary Access URLs
Khi Client (Frontend/Mobile) yêu cầu đọc hoặc tải file, Backend thay mặt Client lên Cloud xin một "Link tạm thời" và trả về cho Client.

1. **Sinh Link Ngắn Hạn (AWS S3 / Signed URL):**
   ```javascript
   // Backend tạo link chỉ có hiệu lực trong 5 phút
   const url = await s3.getSignedUrlPromise('getObject', {
     Bucket: 'private-bucket',
     Key: 'invoices/2026/03/inv_123.pdf',
     Expires: 300 // 5 phút (Tính bằng giây)
   });
   return res.json({ download_url: url });
   ```
2. **Google Drive Proxy Download:**
   Google Drive không hỗ trợ Presigned URL dễ dàng như S3. Cách chuẩn nhất: Backend tạo một Route trung gian (Proxy/Pipe Router):
   - Client gọi: `GET /api/files/:uuid` (Kèm Bearer Token của hệ thống).
   - Backend auth nội bộ -> Nếu hợp lệ, Backend tự dùng Service Account tải Stream từ Drive -> Gắn vào `res.stream()` đẩy ngược lại cho Client.

---

## 3. Quy tắc Headers (Xem trên Web vs Tải về máy)

Khi trả file về cho Frontend (nhất là qua Proxy Stream), AI Agent phải thiết lập `Content-Disposition` để điều khiển hành vi trình duyệt:

### 👁️ Xem Trực Tiếp (Inline)
Dùng cho Hình ảnh, Video, PDF để xem ngay trên cửa sổ trình duyệt.
```http
Content-Type: application/pdf
Content-Disposition: inline; filename="hop-dong-lao-dong.pdf"
```

### 💾 Ép Tải Xuống (Attachment)
Dùng cho Excel, Zip, CSV hoặc khi người dùng click nút "Download".
```http
Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
Content-Disposition: attachment; filename="report_03_2026.xlsx"
```
