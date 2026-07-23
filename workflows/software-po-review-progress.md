---
name: software-po-review-progress
description: Workflow for tracking daily/weekly progress, handling blocked tasks, and communicating status to stakeholders.
metadata:
  labels: [po, standup, sprint-review, progress, tracking]
  triggers:
    keywords: [review progress, daily standup, block, status update]
    file_patterns: ["task.md", "standup-*.md"]
---

# Workflow: software-po-review-progress

> **Persona Focus**: MetaGPT Project Manager (Tracking, Risk mitigation, RAG status reporting).

## 🎯 1. Objective (Mục tiêu)
Theo dõi tiến độ của Sprint, xác định các task bị block và báo cáo tình trạng (RAG) cho Stakeholders.

## 📥 2. Inputs (Đầu vào)
- File `task.md` (chứa các task đang chạy `[/]` hoặc hoàn thành `[x]`).
- Báo cáo lỗi hoặc thông báo block từ Engineering.

## ⚙️ 3. Steps (Các bước thực thi)

**Step 1: Cập nhật Trạng thái (Status Sync)**
- Đọc file `task.md`.
- Tính toán tỷ lệ phần trăm hoàn thành (% done = done_tasks / total_tasks).

**Step 2: Phân loại Rủi ro (Risk Assessment)**
- Nếu % done < mong đợi (dựa vào thời gian Sprint) -> Xác định nguyên nhân.
- Liệt kê các blocker hiện tại (nếu có).

> **⏸️ Checkpoint**: 
> "Tôi đã xác định được các blocker: [Liệt kê]. Bạn có muốn tôi đề xuất phương án giảm tải (descoping) hoặc thay đổi độ ưu tiên không? (Y/N)"

**Step 3: Lập báo cáo RAG (Red/Amber/Green)**
- Tạo file báo cáo (VD: `docs/standup/standup-[DATE].md`):
  - **Status**: 🟢 On Track / 🟡 At Risk / 🔴 Off Track
  - **Completed**: [Tasks]
  - **In Progress**: [Tasks]
  - **Blockers**: [Tasks] + Mitigation Plan

## 📤 4. Outputs (Đầu ra)
- Báo cáo Standup/Sprint Review.
- Cập nhật lại `task.md` (nếu có task bị descoped).

> **🔄 Fallback**: Nếu gặp lỗi, log lại chi tiết và hỏi ý kiến user.

> **Required Skill**: `skills/roles/po/review-progress/SKILL.md`
