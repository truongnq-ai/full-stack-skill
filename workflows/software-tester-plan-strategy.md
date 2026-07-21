---
name: software-tester-plan-strategy
description: QA workflow for planning test strategy, defining test coverage, and generating a test plan document.
metadata:
  labels: [qa, test-plan, strategy, workflow]
  triggers:
    keywords: [plan testing, create test strategy, write test cases]
    file_patterns: ["test-plan.md"]
---

# Workflow: software-tester-plan-strategy

> **Persona Focus**: MetaGPT QA Engineer (Methodical, Coverage-oriented).

## 🎯 1. Objective (Mục tiêu)
Xây dựng kế hoạch kiểm thử (Test Plan) chi tiết dựa trên PRD và System Design, đảm bảo bao phủ 100% các Acceptance Criteria.

## ⚙️ 2. Steps (Các bước thực thi)

**Step 1: Requirement Breakdown**
- Đọc `PRD.md` và `system-design.md`.
- Trích xuất toàn bộ luồng nghiệp vụ.

**Step 2: Define Test Scenarios**
- Xác định các kịch bản kiểm thử: Functional, Non-functional (Performance, Security).

**Step 3: Test Case Generation**
- Lập bảng Test Cases (ID, Tiêu đề, Các bước, Kết quả mong muốn).
- Áp dụng nguyên tắc "1 Happy Path = 3 Unhappy Paths".

> **⏸️ Checkpoint**: 
> "Test Plan nháp đã hoàn thành với X kịch bản. Bạn có muốn tôi ghi chúng ra file `docs/qa/test-plan.md` không? (Y/N)"

## 📤 3. Outputs (Đầu ra)
- File `test-plan.md` chứa toàn bộ kịch bản kiểm thử.

> **🔄 Fallback**: Nếu gặp lỗi, log lại chi tiết và hỏi ý kiến user.

> **Required Skill**: [plan-strategy](file:///D:/GitHub/skill/full-stack-skill/skills/roles/tester/plan-strategy/SKILL.md)
