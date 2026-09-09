# Practical Examples — Structured Questioning (`/question`)

## Example 1: Technical Architecture Decision (Database Migration)

**Context**: Agent needs to migrate data from legacy MongoDB to PostgreSQL, but the target schema design is ambiguous.

**Agent Output**:

```markdown
**❓ [Cấu Trúc Database Đích Khi Migrate]**
> Bối cảnh: Chưa xác định schema đích trong PostgreSQL cho bảng `user_activities` (hiện lưu dạng Document không đồng nhất).

**Lựa chọn:**

* **A. Giữ cấu trúc JSONB linh hoạt (PostgreSQL `JSONB`)**
  - **Phương pháp:** Lưu toàn bộ payload cũ vào một cột kiểu `JSONB` có index GIN.
  - **Ưu điểm:** Triển khai siêu nhanh, 0% rủi ro mất dữ liệu hoặc lỗi mismatch kiểu dữ liệu.
  - **Nhược điểm:** Hiệu năng truy vấn theo từng trường con thấp hơn cột vật lý, không tận dụng được triệt để tính toàn vẹn khóa ngoại của SQL.

* **B. Chuẩn hóa hoàn toàn thành các cột SQL quan hệ (Normalized Schema)**
  - **Phương pháp:** Tách các trường phổ biến thành cột riêng (`user_id`, `activity_type`, `created_at`), chỉ lưu metadata dị biệt vào JSONB.
  - **Ưu điểm:** Tối ưu tốc độ query, index đánh trực tiếp trên kiểu dữ liệu gốc, dễ join với bảng users.
  - **Nhược điểm:** Tốn thêm thời gian viết migration script transformation (ETL) và xử lý dữ liệu lỗi.

💡 **Khuyến nghị:** Chọn **Phương án B** nếu `user_activities` là core-service truy vấn thường xuyên; hoặc **Phương án A** nếu chỉ cần lưu trữ lịch sử audit ít khi đọc.

👉 *Anh chọn phương án nào (A / B)?*
```

---

## Example 2: Business Logic Ambiguity (Discount Policy)

**Context**: User asks to "Thêm tính năng mã giảm giá cho đơn hàng", but the calculation logic is unspecified.

**Agent Output**:

```markdown
**❓ [Cơ Chế Áp Dụng Mã Giảm Giá]**
> Bối cảnh: Chưa xác định cách chiết khấu khi đơn hàng có cả sản phẩm đã khuyến mãi.

**Lựa chọn:**

* **A. Giảm giá trên tổng giá trị đơn hàng (Order-level Discount)**
  - **Phương pháp:** Trừ trực tiếp số tiền / % sau khi đã tính tổng tiền giỏ hàng.
  - **Ưu điểm:** Đơn giản trong code và hóa đơn, khách hàng dễ hiểu.
  - **Nhược điểm:** Có thể dẫn đến tình trạng "khuyến mãi kép" (giảm sâu quá biên lợi nhuận cho sản phẩm đang flash-sale).

* **B. Chỉ giảm giá trên các sản phẩm nguyên giá (Item-level Eligibility)**
  - **Phương pháp:** Lọc danh sách items, chỉ áp dụng mã cho item chưa có tag `is_sale`.
  - **Ưu điểm:** Bảo vệ biên lợi nhuận kinh doanh, chống lạm dụng mã.
  - **Nhược điểm:** Logic tính toán giỏ hàng phức tạp hơn, cần hiển thị rõ ràng trên UI từng dòng để tránh khiếu nại.

💡 **Khuyến nghị:** Chọn **Phương án A** cho giai đoạn MVP hiện tại để đẩy nhanh tiến độ, sau đó nâng cấp lên B khi có yêu cầu chống gian lận thương mại.

👉 *Anh chọn phương án nào (A / B)?*
```

---

## Example 3: Fast-track Rule for Fact Inquiries (No Forced A/B)

**Context**: Agent needs the API endpoint URL or Secret token to configure webhook.

**Agent Output**:

```markdown
**ℹ️ [Khai báo thông tin]**
> Em cần URL endpoint của Webhook Server hoặc biến môi trường `WEBHOOK_SECRET` để hoàn tất cấu hình trong `docker-compose.yml`. Anh cho em xin thông tin này nhé.
```

*(Không ép tạo Option A/B cho các thông tin mang tính định danh hoặc cấu hình bí mật)*.
