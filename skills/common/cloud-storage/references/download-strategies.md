# Download Strategies for Cloud Storage

Tài liệu này quy định các chiến lược trả file về cho Client tùy vào ngữ cảnh bảo mật và loại file. Mục tiêu: Tối ưu hiệu suất (không gánh băng thông dư thừa), đảm bảo quyền truy cập đúng người.

## 1. Sơ đồ Lựa chọn (Decision Tree)

```
Người dùng cần tải file?
│
├── File thuộc Google Workspace (Docs/Sheets/Slides)?
│   └── → Dùng chiến lược [4] Export Links
│
├── File public (ảnh marketing, tài sản công khai)?
│   └── → Dùng chiến lược [1] Direct webContentLink
│
├── File private + nhỏ (< 50MB)?
│   └── → Dùng chiến lược [2] Backend Proxy Stream
│
└── File private + lớn (> 50MB) hoặc cần Resume/Seek?
    └── → Dùng chiến lược [3] S3 Presigned URL (Bắt buộc dùng S3, không dùng Drive)
```

---

## 2. Chiến lược [1]: Direct `webContentLink` (Public File)

Dùng cho file được setting `anyoneWithLink = reader`. Trả thẳng link cho Client, không qua Backend.

```javascript
// Lấy webContentLink khi upload xong
const response = await drive.files.create({
  requestBody: { name: 'public-banner.jpg', parents: [publicFolderId] },
  media: { body: stream },
  fields: 'id, webContentLink, webViewLink'
});
// Lưu cả 2 link vào DB
// webViewLink: Xem trực tiếp trên Google Drive viewer
// webContentLink: Download thẳng về máy
```

> ⚠️ **Không dùng link này cho file private.** Link có thể bị share cho người ngoài.

---

## 3. Chiến lược [2]: Backend Proxy Stream (Private File, < 50MB)

Backend đứng giữa để kiểm soát auth, sau đó stream nội dung Drive trực tiếp về Response.

```typescript
// GET /api/files/:fileId — Route handler chuẩn
async function downloadFileProxy(req, res) {
  // 1. Xác thực người dùng nội bộ
  const fileRecord = await db.mediaFiles.findByLocalId(req.params.fileId);
  if (!fileRecord) return res.status(404).send('File Not Found');

  // 2. Tải stream từ Drive bằng Service Account
  const driveResponse = await drive.files.get(
    { fileId: fileRecord.cloud_file_id, alt: 'media', supportsAllDrives: true },
    { responseType: 'stream' }
  );

  // 3. Thiết lập headers và pipe thẳng về Client
  res.setHeader('Content-Type', fileRecord.mime_type);
  res.setHeader('Content-Disposition', `attachment; filename="${fileRecord.original_name}"`);
  driveResponse.data.pipe(res); // Zero Buffer — Pipe Stream trực tiếp
}
```

> ⚠️ **Google Drive KHÔNG hỗ trợ HTTP Range Requests (Byte Range).** Không thể làm video seek/resume. Với video/media, bắt buộc phải lưu trên S3 hoặc CDN.

---

## 4. Chiến lược [3]: S3 Presigned URL (Private, > 50MB / Media)

Backend không cần gánh băng thông file lớn. Sinh URL tạm thời, trả cho Client, Client tự tải.

```javascript
// Backend: Sinh URL có hiệu lực 5 phút
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const s3 = new S3Client({ region: process.env.AWS_REGION });

async function generatePresignedDownloadUrl(s3Key) {
  const command = new GetObjectCommand({ Bucket: process.env.S3_BUCKET, Key: s3Key });
  return getSignedUrl(s3, command, { expiresIn: 300 }); // 5 phút
}
// Frontend nhận URL → Tự gọi GET request → Download trực tiếp từ S3
```

---

## 5. Chiến lược [4]: Export Google Workspace Documents

Google Docs, Sheets, Slides **không có binary content thực** — chúng là file native của Google. Phải dùng Export API.

```javascript
// Export Google Docs → PDF
const exportStream = await drive.files.export(
  {
    fileId: googleDocsFileId,
    mimeType: 'application/pdf',        // Hoặc 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    supportsAllDrives: true
  },
  { responseType: 'stream' }
);
exportStream.data.pipe(res);
```

| Loại Google file | Export MIME types được hỗ trợ |
| :--- | :--- |
| Google Docs | `application/pdf`, `.docx`, `.txt`, `.html` |
| Google Sheets | `application/pdf`, `.xlsx`, `.csv` |
| Google Slides | `application/pdf`, `.pptx` |

> ⚠️ Export giới hạn **10MB** — Document quá lớn phải được chia nhỏ trước khi export.
