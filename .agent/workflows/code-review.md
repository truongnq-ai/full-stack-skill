---
description: Run an AI-assisted PR code review using the Code Review Expert skill
---

# AI Code Review Workflow

> **Use this workflow when**: user asks to review code, review a PR, review specific files, or check code quality before merging. Trigger phrases: "review this", "code review", "check my PR", `/code-review`.
>
> **Out of scope**: Does not review skill/workflow/rule files — use `skill-review`, `workflow-review`, or `rule-review` for those. Does not auto-run tests or implement fixes.

---

## Step 1 — Define Scope

Ask user which review mode to use:

- **(A) Diff Review** — changes since base branch:
  ```bash
  git fetch origin <base> && git diff origin/<base>...HEAD
  ```
  > **Fallback**: If `git diff` returns empty, run `git log --oneline -10` and ask user to confirm base branch.

- **(B) Specific Files** — user provides paths. Read each with `view_file`. Skip `.gitignore` entries.

- **(C) Full Project** — use `list_dir` to enumerate source files. Review in batches of ≤10 files.

---

## Step 2 — Load Skill & Detect Framework

```bash
view_file skills/common/code-review/SKILL.md
list_dir src/   # detect framework (NestJS, Next.js, Flutter…)
```

- **Role**: Act as Principal Engineer.
- **Focus order**: Logic → Security → Architecture (P0), then Style (P1).
- **Fallback**: If skill missing, review through these lenses: logic correctness, auth/injection security, layer coupling, code style.
- Load matching framework skill if detected (e.g., `skills/nestjs/SKILL.md`).

---

## Step 3 — Generate Report

Save to `docs/code-review.md` (create `docs/` if missing). Output format:

```
## Code Review Report — [Date] — [Scope description]

### 🔴 BLOCKER
- **[FILE:LINE]** [Finding] — [Why it matters] — [Fix suggestion]

### 🟠 MAJOR
- **[FILE:LINE]** [Finding] — [Fix suggestion]

### 🟡 NIT
- **[FILE:LINE]** [Minor suggestion]

### ✅ Summary
BLOCKERs: N | MAJORs: N | NITs: N | Files reviewed: N
```

---

## Step 4 — Implementation Planning

Ask: _"Do you want to implement the feedback now?"_

- **YES**:
  - Use `view_file` to re-read each affected file before modifying.
  - Parse BLOCKERs/MAJORs into checklist items in `task.md`.
  - Apply `skills/common/tdd/SKILL.md` if logic changes required.
- **NO**: End workflow. Report saved to `docs/code-review.md`.

---

## Step 5 — Skill Feedback Sweep (Mandatory)

For each **🔴 BLOCKER** or **🟠 MAJOR**, ask: _"Was there an active skill that should have prevented this?"_

- **YES** → Run immediately:
  ```bash
  npx agent-skills-standard feedback \
    --skill="[category/skill-id]" \
    --issue="[finding]" \
    --skill-instruction="[rule the skill has or is missing]" \
    --actual-action="[what the code did instead]" \
    --suggestion="[proposed skill improvement]"
  ```
- **NO** → Note: _no relevant skill exists_ → Consider creating one with `create-skillset` workflow.

> [!IMPORTANT]
> This step is **not optional**. Every BLOCKER tracing to a known skill = upstream skill quality problem.
> Root causes: (a) skill didn't trigger, (b) rule was wrong, (c) skill missing from `.skillsrc`.
