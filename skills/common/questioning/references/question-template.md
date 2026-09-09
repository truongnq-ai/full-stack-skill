# Question Templates & Tool Payloads

## 1. Markdown Text Template (Chat Interface)

Use this format when communicating directly in standard chat text:

```markdown
**❓ [Tên Vấn Đề Cốt Lõi]**
> Bối cảnh: <1 câu tóm tắt điểm nghẽn hoặc ngã rẽ kỹ thuật cần quyết định>

**Lựa chọn:**

* **A. [Tên phương án A]**
  - **Phương pháp:** <Cách tiếp cận cụ thể>
  - **Ưu điểm:** <Hiệu năng, độ đơn giản, khả năng mở rộng, chuẩn hóa>
  - **Nhược điểm:** <Độ phức tạp, thời gian làm, rủi ro, nợ kỹ thuật>

* **B. [Tên phương án B]**
  - **Phương pháp:** <Cách tiếp cận cụ thể>
  - **Ưu điểm:** <...>
  - **Nhược điểm:** <...>

💡 **Khuyến nghị:** Chọn **[Phương án X]** vì <lý do kỹ thuật và tính thực tiễn trong bối cảnh hiện tại>.

👉 *Anh chọn phương án nào (A / B) hoặc bổ sung yêu cầu riêng?*
```

---

## 2. Interactive Tool Mapping (`ask_question`)

When using the native `ask_question` tool modal in Antigravity:

| Parameter | Mapping Rule | Example |
| :--- | :--- | :--- |
| `question` | Tên vấn đề + Khuyến nghị vắn tắt | `"Chọn chiến lược cache cho User Profile? (Khuyến nghị: Redis)"` |
| `options` | Tối thiểu 2 options, tiền tố `(Khuyến nghị)` cho phương án đề xuất | `["(Khuyến nghị) Redis Cache: Tốc độ cao, đồng bộ đa instance", "In-Memory LRU: Đơn giản, zero infrastructure"]` |
| `is_multi_select` | `false` cho lựa chọn độc quyền, `true` nếu có thể kết hợp | `false` |

---

## 3. User Response Processing Matrix

| Phản hồi của User | Hành vi tiếp theo của Agent |
| :--- | :--- |
| `"A"` hoặc `"B"` | Xác nhận ngắn gọn trong 1 câu: *"Đã chốt phương án A. Bắt đầu triển khai..."* và tiếp tục task. |
| `"A kèm constraint X"` | Hợp nhất constraint X vào phương án A và thực thi ngay, không hỏi lại. |
| `"Ý kiến khác: Z"` | Ghi nhận phương án Z của user làm hướng đi chính và tiếp tục task. |
