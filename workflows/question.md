---
description: Structured questioning & advisory workflow when encountering ambiguity or architectural trade-offs.
---

# ❓ Structured Questioning Workflow (`/question`)

> **Use this workflow when**: Encountering ambiguous requirements, technical trade-offs, or multiple viable implementation paths. Trigger phrases: `/question`, "đặt câu hỏi theo skill /question", "nếu chưa rõ hãy hỏi anh".
>
> **Activates skill**: `skills/common/questioning/SKILL.md`

---

## Step 1 — Codebase Pre-Check (Exhaust Search First)

Search existing patterns before formulating any question:

```bash
# Search for existing implementation patterns or constants
git grep -n "<keyword>"
```

> **Gate**: If answer exists in codebase, apply it and DO NOT ask the user.

---

## Step 2 — Classify Question Type

Determine inquiry category:

- **Decision (Architecture / Design / Business Logic)**: Proceed to Step 3.
- **Fact (Credentials / Environment Variables / Specific Port)**: Use Fast-track direct question; skip multiple-choice options.

---

## Step 3 — Formulate Structured Options

Formulate the decision package using:

```
view_file skills/common/questioning/references/question-template.md
```

Mandatory components:
1. **Core Problem**: 1-2 sentences on what is ambiguous and why input is needed.
2. **Options**: Min 2 viable options (A, B, [C]). Each with explicit Pros & Cons.
3. **Recommendation**: Clear pick with technical rationale.

---

## ⏸️ Checkpoint: Await User Decision

Present formatted question and pause execution:

- `ask_question` tool (if IDE modal is appropriate) OR Markdown Chat format.
- Wait for user response (`A`, `B`, or `Option + Constraint`).

---

## Step 4 — Lock Decision & Resume Task

Apply chosen option to active context:

1. Confirm user choice in 1 sentence: `"Locked Option [X]. Resuming execution..."`
2. Incorporate any user-specified constraints into implementation.
3. Proceed with original task execution without re-asking.

---

## Output (Strict)

```yaml
summary: "<decision locked and action taken>"
risks: ["<acknowledged risk of chosen option>"]
next_checks: ["<verification step for selected approach>"]
```
