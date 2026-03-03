# Google Drive Permissions Model

Tài liệu này quy định các tiêu chuẩn về Phân quyền truy cập file/folder trên Google Drive sao cho an toàn, kiểm soát được và tránh rủi ro mất quyền sở hữu dữ liệu khi có biến động nhân sự.

## 1. Các Role (Vai trò) trong Drive

| Role | Quyền | Ghi chú |
| :--- | :--- | :--- |
| `owner` | Đọc/Sửa/Xóa/Chia sẻ/Chuyển quyền sở hữu | Chỉ 1 owner duy nhất trên 1 file |
| `organizer` | Sắp xếp, di chuyển trong Shared Drive | Chỉ dùng được trong Shared Drive |
| `fileOrganizer` | Sắp xếp folder nhưng không xóa file người khác | Shared Drive |
| `writer` | Đọc + Sửa nội dung | Không chia sẻ cho người khác |
| `commenter` | Đọc + Thêm comment | Không chỉnh sửa nội dung |
| `reader` | Chỉ đọc | Quyền tối thiểu |

---

## 2. Thiết lập Permission đúng chuẩn

```javascript
// ✅ Cấp quyền đọc cho 1 email cụ thể (Không public)
await drive.permissions.create({
  fileId: cloudFileId,
  supportsAllDrives: true,
  requestBody: {
    role: 'reader',
    type: 'user',          // user | group | domain | anyone
    emailAddress: 'partner@company.com'
  }
});

// ✅ Cấp quyền đọc cho toàn bộ domain nội bộ (tốt hơn public)
await drive.permissions.create({
  fileId: cloudFileId,
  supportsAllDrives: true,
  requestBody: {
    role: 'reader',
    type: 'domain',        // Giới hạn trong 1 domain Google Workspace
    domain: 'company.com'
  }
});
```

---

## 3. Domain-Restricted Sharing (Quy tắc Doanh nghiệp)

> **Quy tắc vàng:** Với dữ liệu nội bộ (Hợp đồng, CMND, Hóa đơn), KHÔNG BAO GIỜ set type = `anyone`. Chỉ dùng `domain` hoặc `user`.

| Loại file | Type được phép | Ghi chú |
| :--- | :--- | :--- |
| Avatar, ảnh marketing | `anyone` reader | Cân nhắc kỹ |
| Tài liệu nội bộ | `domain` reader | Chỉ ai có @company.com mới xem được |
| Hợp đồng, hóa đơn | `user` reader | Chỉ cấp cho email cụ thể |
| File hệ thống sinh ra | Không cấp permission (Service Account private) | Chỉ xem qua Proxy API |

---

## 4. Xử lý khi Nhân sự Nghỉ Việc (transferOwnership)

**Rủi ro hiện thực:** File nằm trong **My Drive** của nhân viên nghỉ việc → Tài khoản bị vô hiệu hóa → **Mất quyền truy cập toàn bộ file trong My Drive đó.**

### ✅ Cách phòng tránh (Ưu tiên P0):
1. **Dùng Shared Drive cho mọi file production** — Shared Drive thuộc về Org, không thuộc cá nhân. Khi nhân viên nghỉ, file vẫn còn nguyên.
2. **Nếu đang dùng My Drive:** Chạy script chuyển quyền sở hữu trước khi xóa tài khoản:

```javascript
// Chuyển ownership file từ user cũ sang admin/service account
await drive.permissions.create({
  fileId: fileId,
  supportsAllDrives: false,        // transferOwnership chỉ hỗ trợ My Drive
  transferOwnership: true,
  requestBody: {
    role: 'owner',
    type: 'user',
    emailAddress: 'new-owner@company.com'
  }
});
```

> ⚠️ `transferOwnership` chỉ hoạt động trên **My Drive**, không hoạt động trên **Shared Drive** (vì Shared Drive không có khái niệm owner cá nhân). Đây là lý do để chuyển sang Shared Drive cho toàn bộ dữ liệu production.

---

## 5. Thu hồi Quyền truy cập (Revoke)

```javascript
// Liệt kê tất cả permissions của file
const permissions = await drive.permissions.list({
  fileId: cloudFileId,
  supportsAllDrives: true,
  fields: 'permissions(id, emailAddress, role)'
});

// Tìm và xóa permission của email cụ thể
const target = permissions.data.permissions.find(p => p.emailAddress === 'partner@company.com');
if (target) {
  await drive.permissions.delete({
    fileId: cloudFileId,
    permissionId: target.id,
    supportsAllDrives: true
  });
}
```
