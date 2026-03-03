# Error Handling — Google Drive API Taxonomy

Tài liệu này phân loại TOÀN BỘ các lỗi thực tế từ Google Drive API và quy định cách xử lý đúng cho mỗi loại. AI Agent **không được** xử lý mọi lỗi như nhau bằng cách Retry một cách mù quáng.

## 1. Bảng phân loại lỗi (Error Taxonomy)

| HTTP Code | Error Domain / Reason | Ý nghĩa | Hành động đúng |
| :--- | :--- | :--- | :--- |
| `400` | `badRequest` | Sai cú pháp query, thiếu required fields | ❌ Không retry. Sửa code. |
| `401` | `authError` | Token hết hạn hoặc không hợp lệ | 🔄 Làm mới Access Token → Retry 1 lần |
| `403` | `rateLimitExceeded` | Vượt QPS limit (12.000 req/phút) | ⏳ Retry với Exponential Backoff |
| `403` | `userRateLimitExceeded` | User-level quota vượt | ⏳ Retry với Exponential Backoff |
| `403` | `storageQuotaExceeded` | Drive hết dung lượng lưu trữ | 🚨 ALERT NGAY. Không retry. Dừng upload. |
| `403` | `forbidden` | Service Account thiếu quyền | ❌ Không retry. Kiểm tra IAM/Sharing settings. |
| `403` | `teamDrivesFileSharingNotSupported` | Lỗi chia sẻ trong Shared Drive | ❌ Không retry. Thay đổi logic permission. |
| `404` | `fileNotFound` | File bị xóa, hoặc SA không có quyền đọc | 🗑️ Sync lại DB: Đánh dấu `cloud_deleted_at` |
| `410` | `Gone` | File bị Hard Delete vĩnh viễn khỏi Trash | 🗑️ Đánh dấu `hard_deleted = true` trong DB |
| `429` | `Too Many Requests` | Vượt rate limit API | ⏳ Retry với Exponential Backoff + Jitter |
| `500` | `backendError` | Lỗi phía máy chủ Google tạm thời | ⏳ Retry tối đa 3 lần, sau đó alert |
| `503` | `serviceUnavailable` | Drive API đang bảo trì | ⏳ Retry tối đa 3 lần với backoff dài hơn |

---

## 2. Implementation Chuẩn — Smart Retry

```typescript
// ✅ Phân biệt lỗi Retryable vs Non-Retryable
const RETRYABLE_CODES = new Set([429, 500, 503]);
const RETRYABLE_REASONS = new Set(['rateLimitExceeded', 'userRateLimitExceeded', 'backendError']);
const ALERT_REASONS = new Set(['storageQuotaExceeded']); // Không retry — cần báo động

async function callDriveApi<T>(fn: () => Promise<T>, retries = 5): Promise<T> {
  try {
    return await fn();
  } catch (err: any) {
    const reason = err?.errors?.[0]?.reason;
    const status = err?.status ?? err?.code;

    // 1. Lỗi cần cảnh báo Operations ngay — không retry
    if (ALERT_REASONS.has(reason)) {
      alertOpsTeam(`Drive storage quota exceeded! Reason: ${reason}`);
      throw err;
    }

    // 2. Lỗi Token — refresh rồi retry 1 lần
    if (status === 401) {
      await refreshAccessToken();
      return fn(); // Retry 1 lần duy nhất
    }

    // 3. Lỗi 404 — Sync lại DB
    if (status === 404) {
      await markFileAsCloudDeleted(err.fileId);
      throw err;
    }

    // 4. Lỗi Retryable — Backoff với Jitter
    if (retries > 0 && (RETRYABLE_CODES.has(status) || RETRYABLE_REASONS.has(reason))) {
      const attempt = 5 - retries;
      const delay = (2 ** attempt) * 1000 + Math.random() * 500; // Jitter bắt buộc
      await new Promise(resolve => setTimeout(resolve, delay));
      return callDriveApi(fn, retries - 1);
    }

    // 5. Non-retryable (400, 403 forbidden, v.v.) — throw thẳng
    throw err;
  }
}
```

---

## 3. Quy tắc Đồng bộ DB khi gặp lỗi 404 / 410

Khi API trả `404 fileNotFound` hoặc `410 Gone`, DB nội bộ đang lưu `cloud_file_id` không còn tồn tại trên Cloud. Bắt buộc xử lý:

1. Log chi tiết: `cloudFileId`, `localFileId`, `userId`, `timestamp`.
2. Update record trong `media_files`:
   ```sql
   UPDATE media_files
   SET cloud_deleted_at = NOW(), upload_status = 'CLOUD_MISSING'
   WHERE cloud_file_id = $1;
   ```
3. Không trả lỗi toàn hệ thống — chỉ ảnh hưởng file cụ thể đó.
4. Cân nhắc trigger re-upload nếu file là critical business document.
