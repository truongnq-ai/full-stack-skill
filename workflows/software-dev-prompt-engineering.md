---
name: software-dev-prompt-engineering
description: Iterative workflow for developing, testing, and refining LLM prompts within an application.
metadata:
  labels: [dev, prompt-engineering, llm, workflow]
  triggers:
    keywords: [refine prompt, test prompt, prompt engineering]
    file_patterns: ["prompts/*.txt"]
---

# Workflow: software-dev-prompt-engineering

> **Persona Focus**: AI Integration Engineer (Empirical testing, Edge case mitigation).

## 🎯 1. Objective (Mục tiêu)
Tạo ra một bộ Prompt ổn định, chống được jailbreak, chống hallucination, và ép output đúng định dạng JSON/XML.

## ⚙️ 2. Steps (Các bước thực thi)

**Step 1: Draft Baseline Prompt**
- Viết System Prompt cơ bản. Xác định rõ Role, Task, Context, và Output Format.

**Step 2: Add Few-Shot Examples**
- Bổ sung 2-3 ví dụ (Input -> Output) vào prompt để model học pattern.

**Step 3: Define Constraints (Negative Prompts)**
- Liệt kê những thứ LLM KHÔNG được làm. (VD: "Không được output markdown").

> **⏸️ Checkpoint**: 
> "Bản draft prompt đã sẵn sàng. Bạn có muốn tôi chạy thử script test với 3 test cases mẫu không? (Y/N)"

**Step 4: Execute & Refine (CodeAct)**
- Nếu User đồng ý, chạy một script Python/NodeJS nhỏ gọi API thật để kiểm tra.
- Đọc log, sửa prompt nếu output bị lệch chuẩn.

## 📤 3. Outputs (Đầu ra)
- File `prompt.txt` hoặc code constant được tối ưu.

> **🔄 Fallback**: Nếu gặp lỗi, log lại chi tiết và hỏi ý kiến user.

> **Required Skill**: `skills/common/context-optimization/SKILL.md`
