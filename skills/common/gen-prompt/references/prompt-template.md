# Canonical Execution Prompt Template (6 Blocks)

Use this canonical template when outputting the refined prompt for any AI Agent or IDE:

```markdown
### 🎯 1. Mục tiêu cốt lõi (Core Objective)
[1-2 câu tóm tắt chính xác điều cần đạt được, không lan man, trực diện]

### 📦 2. Bối cảnh & Tài nguyên đầu vào (Context & Resources)
- **Codebase / File tham chiếu:**
  - [Đường dẫn file code hiện tại cần đọc để kế thừa cấu trúc, ví dụ: `src/models/order.ts`]
- **Dữ liệu & Tài liệu nghiệp vụ:**
  - [Payload JSON mẫu, schema CSDL, mock data, hoặc tài liệu Swagger/API spec]
- **Môi trường & Công cụ có sẵn:**
  - [Biến môi trường cần dùng, tool MCP, cổng dịch vụ local/staging, thư viện có sẵn]

### 🚧 3. Phạm vi & Ràng buộc (Scope & Constraints)
- **CẦN LÀM (In-scope):**
  - [Module, hàm, hoặc tác vụ cụ thể cần hiện thực]
  - [Giới hạn trong các file hoặc thư mục chỉ định]
- **KHÔNG LÀM (Out-of-scope):**
  - [Không sửa các module nằm ngoài phạm vi được giao]
  - [Chưa làm giao diện UI nếu task chỉ yêu cầu logic/backend]
  - [Không tự ý thay đổi thư viện, schema DB ngoài kế hoạch]

### 🧰 4. Danh sách Skill/Workflow áp dụng
- **Primary Workflow (Quy trình chủ đạo):** `[Tên-workflow-dẫn-hướng]` ➔ Định hình toàn bộ các bước thực thi tuần tự
- **Supporting Skills (Tiêu chuẩn kỹ thuật bắt buộc):**
  - `common/coding-discipline`: Tiêu chuẩn kỷ luật mã nguồn (phân tích trước, code sau)
  - `[tên-skill-chuyên-môn-1]`: Tiêu chuẩn kỹ thuật cho bước tương ứng
  - `[tên-skill-chuyên-môn-2]`: Tiêu chuẩn bảo mật / test cho bước tương ứng

### 📋 5. Kế hoạch thực thi (Step-by-Step Breakdown)
> ⚠️ **Mutation Gate**: Nếu task thuộc loại Write/Mutate (sửa code, cập nhật doc, thay đổi config, deploy), bước đầu tiên PHẢI là "Phân tích & Lập plan chi tiết" sử dụng `common/writing-plans` hoặc `/software-dev-plan-implementation`, và plan PHẢI được user phê duyệt trước khi thực thi bất kỳ file nào. Task Read-only (phân tích, kiểm tra, báo cáo) được thực thi trực tiếp.
1. **Bước 1: [Tên bước]** — `[skill/workflow tương ứng]`
   - [Hành động cụ thể]
2. **Bước 2: [Tên bước]** — `[skill/workflow tương ứng]`
   - [Hành động cụ thể]
3. **Bước 3: [Tên bước]** — `[skill/workflow tương ứng]`
   - [Hành động cụ thể]
<!-- Thêm Bước 4, Bước 5 nếu cần. Tối thiểu: 3 bước. Tối đa: 5 bước. -->

### ✅ 6. Tiêu chí hoàn thành (Definition of Done)
- [ ] [Lệnh kiểm tra phù hợp với cluster — ví dụ: `npm run lint` / `pytest` / `flutter test` / `terraform validate` / ...]
- [ ] Output khớp với kết quả mong đợi từ dữ liệu mẫu ở Khối 2
- [ ] Không làm phát sinh side-effect hoặc sửa đổi file ngoài phạm vi
```
