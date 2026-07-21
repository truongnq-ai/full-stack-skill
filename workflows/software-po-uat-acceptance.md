---
name: software-po-uat-acceptance
description: PO workflow for User Acceptance Testing (UAT) and confirming feature readiness before release.
metadata:
  labels: [po, uat, acceptance-testing, release]
  triggers:
    keywords: [uat, user acceptance, test feature, release approval]
    file_patterns: ["PRD.md", "task.md"]
---

# Workflow: software-po-uat-acceptance

> **Persona Focus**: MetaGPT Product Manager (Verification against Business Goals, Final Sign-off).

## 🎯 1. Objective (Mục tiêu)
Kiểm tra chéo (cross-check) các tính năng đã được Engineering/QA hoàn thành so với Acceptance Criteria ban đầu trong PRD để quyết định Release.

## 📥 2. Inputs (Đầu vào)
- `PRD.md` (Đặc tả ban đầu).
- `task.md` (Các task đã đánh dấu hoàn thành).
- Báo cáo kiểm thử từ QA (nếu có).

## ⚙️ 3. Steps (Các bước thực thi)

**Step 1: Truy xuất Yêu cầu Gốc (Requirement Traceability)**
- Đọc lại phần Acceptance Criteria của các User Stories trong PRD.
- Đối chiếu với kết quả thực tế trên môi trường staging hoặc qua log/kết quả báo cáo.

**Step 2: Đánh giá UX / Luồng người dùng**
- Kiểm tra xem luồng người dùng (User Flow) có trơn tru và đúng như thiết kế UI/UX Draft không.
- Ghi nhận các lỗi UI nhỏ (Visual bugs) hoặc lỗi logic (Functional bugs).

> **⏸️ Checkpoint**: 
> "UAT phát hiện X lỗi nhỏ (không block luồng chính). Bạn có muốn Approve Release kèm Known Issues, hay Block Release để fix trước? (Approve/Block)"

**Step 3: Quyết định Release (Sign-off)**
- Nếu Approve: Đánh dấu tính năng là `Ready for Release` trong backlog. Tạo danh sách `Known Issues` cho Sprint sau.
- Nếu Block: Chuyển lại trạng thái task về `In Progress` và thông báo cho Engineering.

## 📤 4. Outputs (Đầu ra)
- Quyết định Release (Sign-off document).
- Danh sách các lỗi tồn đọng (Known Issues) cho Sprint tới.
