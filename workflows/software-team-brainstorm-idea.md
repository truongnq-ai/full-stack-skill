---
description: Team brainstorms an idea or feature architecture collaboratively via purely text-based chat, evaluating trade-offs before implementation.
---

# 💡 Brainstorm Idea — Team

> **Use this workflow when**: User needs to explore ideas, design components, or determine the best architectural approach via conversational brainstorming. Trigger: `/software-team-brainstorm-idea`.
>
> **Out of scope**: Does not write code — invoke `writing-plans` skill after the design is finalized.
>
> **Activates skills**: `skills/common/brainstorming/SKILL.md`

---

## Step 1 — Explore Project Context

```bash
ls -F
find . -maxdepth 3 -not -path '*/node_modules/*' -not -path '*/.git/*' -name "*.md" | head -10
git log --oneline -5 2>/dev/null
```

Load the core brainstorming skill:

```
view_file skills/common/brainstorming/SKILL.md
```

Summarize internally: project stack, existing design patterns, and constraints.

---

## Step 2 — Clarifying Questions (Gap Analysis)

Ask clarifying questions to narrow down the scope. 
**Rule**: Provide multiple-choice options (`A, B, C`) where possible. Ask them interactively in the terminal.

Minimum areas to cover:
1. Target use cases and user persona.
2. Existing patterns or tech stacks to adhere to.
3. Key constraints (performance, deadline, data size).

> **Wait for the user's response** before proceeding. 

---

## Step 3 — Propose Approaches & Trade-offs

Present 2-3 design/architectural approaches based on the answers from Step 2.

**For each approach, you MUST clearly define in Markdown format:**
- The concept / solution summary.
- **Ưu điểm** (Pros)
- **Nhược điểm** (Cons)

**Crucial Check**: Mark your single strongest, most contextual recommendation with the exact tag: `[⭐ Khuyến nghị]`.

*Ask the user to select the approach they want to proceed with.*

---

## Step 4 — Deep Dive & Finalize Design

Once an approach is selected, iterate on specific components:
- System flow (data flow, components interaction).
- Edge cases and error handling.
- Ask the user if any part needs adjustment.

Write the final approved concept to a design doc.

```bash
# Save to a documentation file (example filename)
# e.g., using write_to_file on docs/specs/YYYY-MM-DD-<topic>-design.md
```

Ask the user: "Spec written to `docs/specs/<file>`. Please review it before we start planning."

---

## Step 5 — Transition to Implementation

After the user approves the spec, transition to generating an implementation plan:

```
view_file skills/common/writing-plans/SKILL.md
```

Invoke the `writing-plans` skill or transition to the standard planning workflow.

---

## Done Criteria

- [ ] Project context explored.
- [ ] Clarifying questions asked and answered.
- [ ] 2-3 approaches proposed with explicit Pros/Cons.
- [ ] `[⭐ Khuyến nghị]` tag used for the best option.
- [ ] Design document written to `docs/specs/`.
- [ ] `writing-plans` invoked.
