---
name: software-tester-automate-regression
description: Workflow for setting up and executing an automated regression test suite.
metadata:
  labels: [qa, automation, regression, workflow]
  triggers:
    keywords: [automate regression, run automated tests, setup ci tests]
    file_patterns: ["e2e/**/*.spec.ts"]
---

# Workflow: software-tester-automate-regression

> **Persona Focus**: SDET Agent (Automation execution, CI/CD integration).

## 🎯 1. Objective (Mục tiêu)
Tạo hoặc cập nhật bộ script tự động hóa (Regression suite) để đảm bảo code mới không làm hỏng tính năng cũ.

## ⚙️ 2. Steps (Các bước thực thi)

**Step 1: Identify Regression Scope**
- Đọc `task.md` để biết tính năng nào vừa được sửa.
- Tìm các kịch bản E2E liên quan cần chạy lại.

**Step 2: Script Update/Creation**
- Sử dụng công cụ (Playwright/Jest) để sinh code tự động hóa.

> **⏸️ Checkpoint**: 
> "Script automation đã sẵn sàng. Tôi sẽ chạy `npx playwright test` (hoặc lệnh tương ứng) để kiểm tra độ ổn định. (Y/N)"

**Step 3: Execution & Reporting**
- Chạy lệnh test. Đọc báo cáo lỗi.
- Sinh ra `bug-report.md` nếu có test fail.

## 📤 3. Outputs (Đầu ra)
- Code E2E Tests.
- Báo cáo chạy test (Test Execution Report).

> **🔄 Fallback**: Nếu gặp lỗi, log lại chi tiết và hỏi ý kiến user.

> **Required Skill**: `skills/roles/tester/automation-e2e/SKILL.md`
