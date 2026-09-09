# Senior Tech Lead 12-Point Plan Audit Checklist

Every implementation plan reviewed by `/review-plan` must pass all 12 checkpoints:

| # | Tiêu chí đánh giá | Câu hỏi kiểm toán bắt buộc |
|---|-------------------|-----------------------------|
| **1** | **Data Loss & Integrity** | Plan có lệnh xóa/sửa dữ liệu không thể hoàn tác không? Đã có backup / soft-delete chưa? |
| **2** | **Rollback Strategy** | Nếu bước N bị crash giữa chừng, hệ thống phục hồi về trạng thái nhất quán bằng cách nào? |
| **3** | **Performance & Scale** | Có nguy cơ N+1 query, blocking main thread, memory leak hay thiếu index CSDL không? |
| **4** | **Security & Auth Scope** | Endpoint mới có bị lộ ngoài public không? Đã validate đầu vào và chống injection chưa? |
| **5** | **Contract Breaking** | API payload thay đổi có làm gãy mobile/web client cũ đang hoạt động không? |
| **6** | **Idempotency & Concurrency** | Nếu user bấm nút 2 lần liên tiếp hoặc request bị retry, có bị duplicate dữ liệu không? |
| **7** | **Edge Cases & Null Safety** | Dữ liệu null, chuỗi rỗng, timeout, disconnect mạng đã có kịch bản xử lý cụ thể chưa? |
| **8** | **No Placeholders Law** | Có bất kỳ từ nào dạng `TODO`, `TBD`, "xử lý lỗi sau", "viết test sau" mà thiếu code thực tế không? |
| **9** | **Atomic Granularity** | Mỗi bước có thực sự là hành động nguyên tử kéo dài 2–5 phút không? |
| **10** | **TDD Verification Flow** | Có quy định rõ: viết test fail $\rightarrow$ chạy fail $\rightarrow$ viết code $\rightarrow$ chạy pass $\rightarrow$ commit không? |
| **11** | **Env & Secret Isolation** | Có hardcode API key, password, port hay URL tuyệt đối vào mã nguồn không? |
| **12** | **Strict Type Safety** | Có lạm dụng `any`, `unknown` không ép kiểu, hoặc ép kiểu mù (type casting không an toàn) không? |
