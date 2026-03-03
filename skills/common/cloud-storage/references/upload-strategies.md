# Upload & Validation Strategies

Tài liệu này quy định cách xử lý Stream Data từ Request của Client lên các hệ thống Cloud (VD: Google Drive, AWS S3) nhằm bảo đảm không bao giờ văng lỗi `Out of Memory (OOM)` trên Server.

## 1. No Memory Buffering (Tuyệt đối không lưu đệm vào RAM)

Đây là ranh giới giữa một đoạn code "chạy được" và code "chuẩn production". 

### 🚫 Anti-Pattern (Lỗi sập Server phổ biến)
Nhận file từ Request, load toàn bộ vào biến (RAM chờ), sau đó mới gọi hàm `upload(fileBuffer)` của SDK.
Nếu 10 users cùng lúc gửi file 100MB, Node.js/Java Server sẽ ngốn lập tức 1GB RAM và có khả năng bị hệ điều hành Kill process.

```javascript
// ❌ SCANDALOUS ANTI-PATTERN (Gây giật lag, treo máy chủ)
app.post('/upload', async (req, res) => {
  const fileBuffer = req.file.buffer; // Chết dở: Toàn bộ file đang nằm ở RAM 
  
  await googleDrive.files.create({
    requestBody: { name: 'test.mp4' },
    media: { body: fileBuffer } // S3/Drive load toàn bộ file vào RAM 1 lần nữa 
  });
});
```

### ✅ Best Practice: Data Streaming (Pipe IO)
Chỉ chuyển luồng (Pipe) byte nhận được từ Client sang đích đến Cloud. Bộ nhớ tiêu thụ của ứng dụng sẽ tiệm cận O(1) bất kể kích thước file.

```javascript
// ✅ PRODUCTION STANDARD: Streaming 
app.post('/upload-stream', (req, res) => {
  // Lấy stream trực tiếp thay vì parse file (VD dùng 'busboy' ở Nodejs)
  const fileStream = req.stream_luong_du_lieu_tu_client(); 
  
  // Truyền nguyên Stream thẳng qua API của Cloud SDK
  await googleDrive.files.create({
    requestBody: {
      name: 'secure_name_123.mp4',
    },
    media: {
      mimeType: 'video/mp4',
      body: fileStream // <--- QUAN TRỌNG: Truyền PassThrough / Readable Stream
    }
  });
});
```

---

## 2. Chiến lược xử lý kích thước file (Size-based Strategy)

AI Agent khi viết code xử lý Upload bắt buộc phải rẽ nhánh (if/else) tùy vào `Content-Length`.

| File Size | Chiến lược | Cơ chế thực hiện | Mức độ phức tạp |
| :--- | :--- | :--- | :--- |
| **< 5 MB** | Direct/Standard Upload | Đẩy toàn bộ Stream trong 1 kết nối duy nhất (Singular HTTP Request). | Thấp |
| **5 MB - 50 MB** | Multipart Upload | Chia nhỏ file theo bộ đệm (VD: 5MB/part), đẩy nối tiếp nhau. Thất bại part nào gửi lại part đó. | Trung bình |
| **> 50 MB** | Resumable Upload / Presigned URL | Không cho phép Client upload qua Backend. Backend chỉ sinh 1 `Signed URL`, giao lại cho Client tự Upload thẳng (Direct-to-Cloud) vào S3/Drive. | Cao |

> **Lưu ý nghiệp vụ Direct-to-Cloud (Kỹ thuật P0):** Việc route luồng file lớn đi ngang qua con Server của chúng ta là lãng phí băng thông mạng nội bộ. Hãy để trình duyệt của End-User tự kết nối và đẩy file thẳng lên Google APIs. Backend lúc này chỉ đóng vai trò Authorization (cung cấp vé thông hành).

---

## 3. Xác minh tính sinh học của File (Magic Bytes Validation)

Không bao giờ được tin tưởng thuộc tính `ext` hoặc `mime_type` mà Client (hoặc Postman/cURL) gửi. Kẻ tấn công có thể đổi tên file `malware.exe` thành `avatar.png` và tấn công hệ thống nội bộ.

### Chuẩn Mực Bắt Buộc (MIME Sniffing / Magic Bytes):
AI Agent phải dặn Frontend stream ~4100 bytes đầu tiên của file (File Signature Header) vào phần mềm để nhận diện chuẩn chính xác định dạng file.

**Luật kiểm duyệt (Security Check):**
1. Đọc Header Bytes (Chunk đầu).
2. Kiểm tra chữ ký file - Ví dụ: 
   - PNG luôn bắt đầu bằng: `89 50 4E 47 0D 0A 1A 0A` 
   - PDF luôn bắt đầu bằng: `25 50 44 46` (`%PDF`)
3. So khớp loại kết quả đọc được với Allow-list của ứng dụng (VD: Chỉ cho `.pdf`, `.jpg`).
4. Từ chối (Drop kết nối) lập tức nếu phát hiện giả mạo.

---

## 4. Rate Limiting và Tự động phục hồi (Exponential Backoff)

Khi upload số lượng lớn (Batch Upload) lên Google Drive, bạn rất dễ chạm ngưỡng `403 Rate Limit Exceeded` (User Rate Limit Exceeded). AI Agent luôn phải bao bọc (wrap) hàm gọi API Cloud vào block Retry an toàn.

```typescript
// ✅ PSEUDOCODE: Tiêu chuẩn khi gọi Google APIs
async function uploadToDrive(stream, retryCount = 0) {
  try {
    return await driveClient.upload(stream);
  } catch (error) {
    if (error.status === 403 || error.status === 429) {
      if (retryCount >= 5) throw new Error("Vượt quá giới hạn Retry");
      
      // Chờ lâu hơn theo hàm mũ: 1s -> 2s -> 4s -> 8s -> 16s
      const delayTime = Math.pow(2, retryCount) * 1000 + Math.random() * 1000; // Phải có Jitter 
      await delay(delayTime);
      
      return uploadToDrive(stream, retryCount + 1);
    }
    throw error; // Lỗi khác (ví dụ sai API key, file quá lớn...) văng thẳng ra
  }
}
```
