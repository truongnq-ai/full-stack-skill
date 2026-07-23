---
name: software-dev-resolve-production-bug
description: Complete workflow for a developer resolving a production crash from stacktrace to hotfix.
metadata:
  labels: [workflow, dev, bug, hotfix, production]
  triggers:
    keywords: [resolve production bug, fix crash, hotfix workflow]
---

# Workflow: software-dev-resolve-production-bug

> **Persona Focus**: Senior Reliability Engineer (Safe, Evidence-based Debugging).

## 🎯 1. Objective (Mục tiêu)
Phân tích lỗi (Crash/Exception) xảy ra trên môi trường Production, tìm chính xác dòng code gây lỗi, phân tích lịch sử GitHub, và đề xuất bản vá (Hotfix).

## ⚙️ 2. Steps (Các bước thực thi)

**Step 1: Triage Stacktrace**
- Kích hoạt kỹ năng `dev-production-debugging`.
- Đọc Stacktrace và dùng `mcp_ssh_read` để lấy thêm context file log nếu cần.

**Step 2: Root Cause & History**
- Dùng `view_file` hoặc `grep_search` dò đến đúng file local chứa dòng code lỗi.
- Dùng `mcp_github_search_issues` để xem lỗi này từng xuất hiện chưa.

> **⏸️ Checkpoint 1**: 
> "Đã xác định được Root Cause tại file [X], dòng [Y]. Bạn có muốn tôi tiến hành viết mã Hotfix không? (Y/N)"

**Step 3: Develop Hotfix & Test**
- Sửa code local.
- Viết thêm 1 Unit Test để đảm bảo lỗi không tái diễn.

> **⏸️ Checkpoint 2**: 
> "Hotfix và Test đã xong. Bạn có muốn tôi tạo Pull Request và chạy Review Security (`dev-code-review-security`) không? (Y/N)"

## 📤 3. Outputs (Đầu ra)
- File mã nguồn đã được vá (Hotfix).
- Unit Test đi kèm.
- Báo cáo phân tích nguyên nhân gốc rễ (RCA).

> **🔄 Fallback**: Nếu gặp lỗi, log lại chi tiết và hỏi ý kiến user.

> **Required Skill**: `skills/roles/dev/production-debugging/SKILL.md`
