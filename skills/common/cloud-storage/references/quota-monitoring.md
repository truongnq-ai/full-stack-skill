# Quota Monitoring & Alerting for Cloud Storage

Tài liệu này cung cấp các pattern giám sát dung lượng và API quota chủ động. Mục tiêu: Hệ thống tự phát hiện và cảnh báo trước khi chạm ngưỡng, không để sự cố mới biết.

## 1. Giám sát Dung lượng Google Drive

Google Drive API cung cấp endpoint `about.get` để đọc thông tin quota.

```javascript
// Script định kỳ (Chạy bằng Cron mỗi 6 tiếng)
async function checkDriveStorageQuota(driveClient) {
  const about = await driveClient.about.get({
    fields: 'storageQuota'
  });

  const quota = about.data.storageQuota;
  const usedGB = parseInt(quota.usage) / (1024 ** 3);
  const limitGB = parseInt(quota.limit) / (1024 ** 3);
  const usedPercent = (usedGB / limitGB) * 100;

  console.log(`Drive Quota: ${usedGB.toFixed(2)}GB / ${limitGB.toFixed(2)}GB (${usedPercent.toFixed(1)}%)`);

  // Alert khi chạm ngưỡng 80%
  if (usedPercent >= 80) {
    await sendAlert({
      severity: usedPercent >= 95 ? 'CRITICAL' : 'WARNING',
      message: `Google Drive storage at ${usedPercent.toFixed(1)}%. Used: ${usedGB.toFixed(2)}GB / ${limitGB.toFixed(2)}GB`,
      channel: '#infra-alerts'
    });
  }

  return { usedGB, limitGB, usedPercent };
}
```

---

## 2. Giám sát API Quota (Requests Per Minute)

Google Drive API giới hạn **12.000 requests/phút** cho toàn bộ Project. Khi nhiều team sử dụng cùng 1 Service Account, nguy cơ vượt ngưỡng rất cao.

### ✅ Cách theo dõi qua Google Cloud Console:
- `APIs & Services` → `Google Drive API` → `Quotas & System Limits`
- Bật **Alert Policy** khi QPS vượt 80% (9.600 req/phút).

### ✅ Implement local rate limiter để tự bảo vệ:

```typescript
// Dùng thư viện 'bottleneck' hoặc tự implement token bucket
import Bottleneck from 'bottleneck';

// Giới hạn tối đa 150 requests/giây (9.000/phút) — buffer an toàn
const driveLimiter = new Bottleneck({
  maxConcurrent: 10,           // Tối đa 10 request song song
  minTime: 7,                  // Tối thiểu 7ms giữa 2 request (~142 req/s)
});

// Wrap mọi lời gọi Drive API
const safeUpload = driveLimiter.wrap(async (stream, metadata) => {
  return drive.files.create({ media: { body: stream }, requestBody: metadata });
});
```

---

## 3. Bảng ngưỡng Alert khuyến nghị

| Metric | Ngưỡng WARNING | Ngưỡng CRITICAL | Hành động |
| :--- | :--- | :--- | :--- |
| Storage Usage | 80% | 95% | Cảnh báo team, lập kế hoạch dọn dẹp |
| API Requests (QPS) | 70% quota | 90% quota | Throttle upload batch, bật local rate limiter |
| Upload FAILED liên tiếp | 5 lần / 10 phút | 20 lần / 10 phút | Alert on-call, kiểm tra Service Account |
| Files trong 1 folder | 300.000 | 450.000 | Tái cấu trúc phân vùng thư mục (partition) |

---

## 4. Khuyến nghị Tổng hợp (CloudOps Checklist)

- [ ] **Cài Cron job** chạy `checkDriveStorageQuota` mỗi 6 tiếng.
- [ ] **Tích hợp Alerting** vào Slack/PagerDuty/Email với 2 mức severity.
- [ ] **Bật Bucket Versioning** trên S3 (Nếu dùng song song S3).
- [ ] **Cấu hình S3 Lifecycle Rules**: Files trong `temp/` tự xóa sau 7 ngày.
- [ ] **Quarterly review**: Quét file trong `deleted_at > 90 ngày` và Hard Delete để thu hồi dung lượng.
