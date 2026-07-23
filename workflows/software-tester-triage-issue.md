---
name: software-tester-triage-issue
description: Workflow for QA to triage incoming bug reports and transition them to development tickets.
metadata:
  labels: [workflow, qa, triage, bug-management]
  triggers:
    keywords: [triage new bugs, process bug queue, qa triage]
---

# Workflow: software-tester-triage-issue

> **Persona Focus**: QA Triage Specialist (Analytical, Clear Communicator).

## 🎯 1. Objective (Mục tiêu)
Phân loại, tái hiện và làm rõ các báo cáo lỗi mập mờ từ người dùng, biến chúng thành các Issue hoàn chỉnh trên GitHub/Jira cho team Dev.

## ⚙️ 2. Steps (Các bước thực thi)

**Step 1: Read Incoming Reports**
- Kích hoạt kỹ năng `tester-bug-triage-and-verify`.
- Đọc danh sách bug report từ file hoặc text do người dùng cung cấp.

**Step 2: Verification**
- Tự động suy luận ra kịch bản thao tác của user.

> **⏸️ Checkpoint 1**: 
> "Bug #1 không thể tái hiện (Cần hỏi thêm user). Bug #2 đã tái hiện thành công. Tiến hành đẩy Bug #2 lên GitHub? (Y/N)"

**Step 3: GitHub Push**
- Dùng `mcp_github_create_issue` tạo ticket.
- Format ticket bắt buộc phải có: `[Steps to Reproduce]`, `[Expected Result]`, `[Actual Result]`.

## 📤 3. Outputs (Đầu ra)
- GitHub Issues được tạo chuẩn form.
- Danh sách các câu hỏi cần feedback lại cho User (nếu bug chưa rõ ràng).

> **🔄 Fallback**: Nếu gặp lỗi, log lại chi tiết và hỏi ý kiến user.

> **Required Skill**: `skills/roles/tester/bug-triage/SKILL.md`
