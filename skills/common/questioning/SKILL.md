---
name: questioning
description: Use when requirements are ambiguous, technical trade-offs exist, or decisions require user input via structured multiple-choice questions.
metadata:
  labels:
    - questioning
    - decision
    - clarification
    - advisory
    - common
  triggers:
    priority: high
    confidence: 0.85
    keywords:
      - /question
      - question
      - clarify
      - ambiguity
      - decision
      - options
      - trade-off
      - đặt câu hỏi
      - làm rõ
    task_types:
      - planning
      - analysis
      - implementation
      - review
workflow_ref: question
---

# Structured Questioning & Advisory (`/question`)

> **Goal**: Turn AI from a passive questioner into an active technical advisor. Reduce cognitive load by presenting structured trade-offs instead of open-ended questions.

## Rule Zero: Search Before Asking
Never ask a question whose answer exists in the codebase. Exhaust `grep_search` and `view_file` before triggering this skill.

## Question Classification

1. **Decision (Architectural, Logic, Trade-off)**: BẮT BUỘC dùng format trắc nghiệm đa phương án (A/B/C) kèm Ưu/Nhược điểm và Khuyến nghị.
2. **Fact (Port, Secret, Identifier, Exact Path)**: Dùng **Fast-track Rule** — hỏi trực diện 1 câu ngắn gọn, không bịa ra các lựa chọn giả tạo.

## Mandatory Format for Decisions

```
**❓ [Vấn đề cốt lõi]**
<Mô tả ngắn gọn 1-2 câu: điểm mơ hồ là gì và tại sao cần ý kiến quyết định>

**Các phương án:**

**A. <Tên phương án A>**
- Phương pháp: <Mô tả tóm tắt cách triển khai>
- Ưu điểm: <Tác động tích cực về kỹ thuật, tốc độ, độ tin cậy>
- Nhược điểm: <Rủi ro, nợ kỹ thuật, chi phí hoặc hạn chế>

**B. <Tên phương án B>**
- Phương pháp: <Mô tả tóm tắt cách triển khai>
- Ưu điểm: <...>
- Nhược điểm: <...>

💡 **Khuyến nghị:** Chọn **Phương án X** vì <lý do kỹ thuật / thực tiễn rõ ràng trong ngữ cảnh hiện tại>.
```

## Anti-Patterns

- **No open-ended queries**: Do provide min 2 actionable options with explicit pros/cons.
- **No unresearched questions**: Do inspect existing code/patterns before asking.
- **No neutral hesitation**: Do make a definitive recommendation with rationale.
- **No option bloating**: Do limit to 2-3 strongest options to protect user flow state.
- **No fake options for facts**: Do ask direct factual questions without forced multiple choices.

## Verification Checklist

- [ ] Codebase searched before asking question?
- [ ] Classified correctly (Decision vs Fact)?
- [ ] At least 2 distinct, viable options provided for Decisions?
- [ ] Each option has clear Pros and Cons?
- [ ] Recommendation included with justifiable rationale?
- [ ] SKILL.md under 100 lines?

## References

- [Template & Tool Payload](references/question-template.md)
- [Practical Examples](references/examples.md)
