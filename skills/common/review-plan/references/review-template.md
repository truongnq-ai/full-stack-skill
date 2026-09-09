# Plan Review Templates & Output Standards

## 1. Plan Review Assessment Report Template

Use this template when producing the `/review-plan` report for the user:

```markdown
# 🛡️ Plan Audit & Hardening Report

**Evaluated Plan**: `[Plan Title / File Path]`
**Audit Result**: `[APPROVED WITH REVISIONS / BLOCKED - AWAITING CLARIFICATION]`

---

## 1. 🔍 Gap & Blindspot Analysis

| # | Hạng mục kiểm tra | Phát hiện / Điểm mù | Mức độ rủi ro | Biện pháp vá trong Revised Plan |
|---|-------------------|---------------------|:-------------:|---------------------------------|
| 1 | Error & Edge Cases | <e.g., Thiếu xử lý khi network timeout> | `HIGH` | <Thêm retry exponential backoff> |
| 2 | Placeholder Check | <e.g., Bước 3 chứa TODO: add validation> | `MEDIUM` | <Cung cấp schema Zod đầy đủ> |
| 3 | Rollback / Failure | <e.g., Schema migration không có hàm down> | `CRITICAL`| <Bổ sung migration rollback script> |

---

## 2. ⚡ Impact Assessment Matrix

- **API Contracts**: `[NO BREAKING CHANGES / BREAKING: Chi tiết...]`
- **Database / Schema**: `[SAFE / MUTATION NEEDING LOCK: Chi tiết...]`
- **Auth & Permissions**: `[UNTOUCHED / ENDPOINT EXPOSED: Chi tiết...]`
- **Regression Scope**: `[ISOLATED / AFFECTS MODULE X, Y: Chi tiết...]`

---

## 3. 🛠️ Revised Plan (Kế hoạch đã tái cấu trúc & vá lỗi)

> *Bản kế hoạch dưới đây đã được vá toàn bộ lỗ hổng, sẵn sàng đưa vào IDE hoặc Agent thực thi ngay.*

### [Feature Name] Hardened Implementation Plan

**Goal**: <1 câu mục tiêu>
**Architecture**: <2-3 câu kiến trúc>
**Tech Stack**: <Thư viện, công nghệ>

#### Task 1: <Tên task nguyên tử 1>
- [ ] 1.1 Viết unit test kiểm tra failure case tại `path/to/test.ts`
- [ ] 1.2 Chạy test để xác nhận fail với mã lỗi dự kiến
- [ ] 1.3 Triển khai code tối thiểu tại `path/to/source.ts`
- [ ] 1.4 Chạy lại test xác nhận pass
- [ ] 1.5 Commit với message `feat: <description>`

#### Task 2: <Tên task nguyên tử 2>
...

---

## 4. 🛑 Fail-Safe Checkpoint

- **Trường hợp A (Hoàn toàn rõ ràng)**:
  > ✅ *Kế hoạch đã được vá toàn diện và sẵn sàng thực thi. Anh có muốn bắt đầu thực hiện ngay không?*

- **Trường hợp B (Phát hiện điểm mù cần quyết định của User)**:
  > ⚠️ *Phát hiện ngã rẽ kỹ thuật cần quyết định trước khi chốt plan cuối:*
  > *(Tự động kích hoạt format `/question` với A/B Options + Pros/Cons + Recommendation)*.
```
