---
name: software-po-manage-backlog
description: Workflow for managing the product backlog, prioritizing features using P0/P1/P2, and preparing a sprint plan.
metadata:
  labels: [po, backlog, sprint-planning, prioritization]
  triggers:
    keywords: [manage backlog, prioritize tasks, sprint planning]
    file_patterns: ["backlog.md", "task.md"]
---

# Workflow: software-po-manage-backlog

> **Persona Focus**: MetaGPT Product Manager (Structured, Prioritization-focused, Strict Dependency checking).

## 🎯 1. Objective (Mục tiêu)
Tổ chức, ưu tiên hóa và phân bổ các yêu cầu từ PRD vào `backlog.md` và `task.md` để team Engineering có thể thực thi trong Sprint tiếp theo.

## 📥 2. Inputs (Đầu vào)
- File `PRD.md` hoặc các yêu cầu tính năng (feature requests).
- Sức chứa (Capacity) của team trong Sprint.

## ⚙️ 3. Steps (Các bước thực thi)

**Step 1: Quét và Trích xuất (Extract Requirements)**
- Sử dụng công cụ đọc file (vd: `view_file`) để quét toàn bộ nội dung PRD/Specs.
- Liệt kê ra nháp tất cả các yêu cầu kỹ thuật và tính năng.

**Step 2: Áp dụng Mô hình Ưu tiên (Prioritization)**
- Đánh giá từng yêu cầu theo chuẩn MetaGPT:
  - **P0 (Must-have)**: Bắt buộc phải có để luồng chính hoạt động.
  - **P1 (Should-have)**: Quan trọng nhưng có thể lùi lại nếu thiếu thời gian.
  - **P2 (Nice-to-have)**: Tính năng bổ trợ nhỏ.
- Cập nhật `backlog.md` với bảng đánh giá này.

**Step 3: Phân tích Phụ thuộc (Dependency Check)**
- Kiểm tra tính phụ thuộc giữa các task (Backend -> Frontend -> QA).

> **⏸️ Checkpoint**: 
> "Backlog đã được phân loại ưu tiên. Tôi có nên chuyển các task P0 vào `task.md` cho Sprint tới không? (Y/N)"

**Step 4: Breakdown Task**
- Nếu User đồng ý, viết các task P0 vào `task.md`.
- Task phải theo chuẩn: `[ ] Tên task (Role) - Acceptance Criteria rõ ràng.`

## 📤 4. Outputs (Đầu ra)
- File `backlog.md` được cập nhật.
- File `task.md` chứa danh sách task cho Sprint mới.
