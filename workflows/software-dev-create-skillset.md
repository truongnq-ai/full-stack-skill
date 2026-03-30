---
description: Dev creates a new language/framework skillset — from research through drafting to validation and token calculation.
---

# 🧩 Dev Create Skillset

> **Use this workflow when**: dev wants to create skills for a new language or framework. Trigger: `/software-dev-create-skillset`.
>
> **Out of scope**: Does not modify existing skills — use `software-reviewer-audit-skills`. Does not create workflows — use `software-reviewer-audit-workflows` for guidance.
>
> **Activates skill**: `skills/common/writing-skills/SKILL.md`

---

## Step 1 — Scope & Definition

Gather: target name (e.g. `spring-boot`), version, reference materials (URLs/docs).

**Persona**: Principal Engineer + SME.

Identify core pillars (e.g. `security`, `persistence`, `rest-api`, `testing`).

---

## ⏸️ Checkpoint: Confirm Pillars

```
"Proposed pillars for [target]: [list]
Looks right? (Y / N)"
```

---

## Step 2 — Research & Scaffold

```bash
mkdir -p skills/<category>/{language,best-practices,tooling}
```

Deep-dive official docs, release notes, community standards. Extract high-density rules.

---

## Step 3 — Pre-Drafting Strategy

| Target verbosity | Strategy |
|-----------------|----------|
| Verbose (Java, Go) | Default to reference extraction → `references/implementation.md` |
| Concise (Python, TS) | Inline examples ≤10 lines acceptable |

> **Rule**: Never inline code >5 lines. Extract to `references/` immediately.

---

## Step 4 — Draft Skills

Per pillar, create `SKILL.md` with: metadata/triggers, priority, structure tree, implementation guidelines (imperative), anti-patterns (`**No X**: Do Y`), verification checklist.

**Constraint**: Body ≤100 lines (~500 tokens).

---

## Step 5 — Reference Compression

Move to `references/`: examples >10 lines, checklists, implementation templates. Link from `SKILL.md`.

---

## Step 6 — Validation

```bash
pnpm --filter ./cli run dev validate --all
```

> **Fallback**: Manually verify: triggers present, priority set, anti-patterns formatted, body ≤100 lines.

---

## Done Criteria

- [ ] All `SKILL.md` files pass validation
- [ ] Anti-patterns use `**No X**: Do Y` format
- [ ] Code examples >10 lines in `references/`
- [ ] Token footprint ≤500 per skill
