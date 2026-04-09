# Product Requirements Document: Brainstorming Text-based UI

**Status**: Draft | **Owner**: USER | **Date**: 2026-04-09

## 1. Executive Summary

_Vấn đề & Giải pháp_: Tính năng Visual Companion của `brainstorming` skill (dùng server Node.js và tạo trang HTML) dư thừa và tạo trải nghiệm phức tạp (cần mở trình duyệt riêng biệt) đối với các trường hợp chỉ cần so sánh lựa chọn. Mục tiêu của bản PRD này là làm sạch, gỡ bỏ toàn bộ luồng "Visual Companion" và chuyển đổi 100% việc hỏi-đáp, nhận phản hồi sang **khung chat/terminal**. Mọi lựa chọn đều phải đi kèm phân tích lợi hại, cùng với một khuyến nghị ưu tiên rõ ràng.

## 2. User Stories & Acceptance Criteria

| ID  | User Story | Acceptance Criteria (Must be Verifiable) | Priority |
| --- | ---------- | ---------------------------------------- | -------- |
| 1   | Với tư cách người dùng, tôi muốn nhận các câu hỏi trắc nghiệm trực tiếp qua khung chat thay vì phải bật HTML. | - [ ] Không có tệp HTML nào được tạo ra trong quá trình hỏi. <br> - [ ] Không có Node Server nào được khởi động. | P0 |
| 2   | Với tư cách người dùng, tôi muốn biết ưu nhược điểm của mỗi lựa chọn để dễ ra quyết định. | - [ ] Mỗi câu hỏi/đáp án đều phải kèm phân tích "Ưu điểm" và "Nhược điểm". | P0 |
| 3   | Với tư cách người dùng, tôi muốn AI đề xuất một phương án tối ưu dựa trên ngữ cảnh dự án. | - [ ] Đáp án được khuyến nghị phải có đánh dấu `[⭐ Khuyến nghị]` ngay cạnh. | P0 |

## 3. Functional Requirements

- [ ] **Data Flow**: Agent phân tích nội dung -> Tạo câu hỏi trắc nghiệm ngay trên UI terminal/chat -> Nhận phản hồi -> Lưu xác nhận -> Tiến hành tạo spec.
- [ ] **Error States**: Không áp dụng (Tính năng chat thuần không đối diện các lỗi sập server/HTML binding).
- [ ] **Edge Cases**: Khi dự án quá mới chưa có ngữ cảnh, AI đưa ra khuyến nghị dựa trên standard best-practice của ngôn ngữ đó ở hiện tại.

## 4. Technical Guardrails & Constraints

- **Tech Stack**: Markdown, Natural Language Instructions (trong System Prompts `SKILL.md`).
- **Xóa bỏ các scripts (Cleanup)**: Bắt buộc xóa toàn bộ file `.sh`, `.cjs`, `.js`, `.html` trong `skills/common/brainstorming/scripts/` và các tài liệu tham khảo liên quan (`visual-companion.md`).

## 5. UI/UX Guidelines (Nội quy hiển thị trên Terminal/Chat)

- **Layout**: Có thể tùy biến (Flexible) ví dụ dùng blockquote, bullet hoặc markdown table.
- **Yêu cầu bắt buộc**: Nội dung phải cực kỳ dễ đọc. Phải có phần "Ưu điểm", "Nhược điểm".
- **Khuyến nghị**: Sử dụng chuẩn đánh dấu: `[⭐ Khuyến nghị]`.

## 6. Out of Scope

- Không chỉnh sửa cách viết Design Document cuối cùng (vào `docs/specs`).
- Không tinh chỉnh hay phân tách file `SKILL.md` (chỉ tập trung gỡ bỏ lệnh Visual Companion và update instruction mới).

## 7. Open Questions

- [ ] Không có.
