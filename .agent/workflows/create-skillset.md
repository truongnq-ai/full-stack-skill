---
description: How to create a new Language/Framework Skillset
---

# Create New Skillset Workflow

> **Use this workflow when**: user wants to create a new skill category, add skills for a new language/framework, or runs `/create-skillset`. Trigger phrases: "create skill for X", "add skillset", "new skills for [language]".
>
> **Out of scope**: Does not modify existing skills — use `skill-review` to audit and improve them. Does not create workflows or rules — use `workflow-review` for guidance.

> [!IMPORTANT]
> All skills MUST strictly follow the [Skill Creator Standard](.agent/skills/skill-creator/SKILL.md).
> Run `find . -name "SKILL.md" -path "*skill-creator*"` to locate it if path differs.

---

## Step 1 — Scope & Definition

Gather required inputs from user:

- **Target Name**: language or framework (e.g., `spring-boot`, `golang`, `flutter`)
- **Target Version**: (e.g., `3.x`, `1.21`, `3.16`)
- **Reference Materials**: URLs, PDFs, or internal wikis to ground skill in authoritative sources

**Persona**: Adopt Principal Software Engineer + Subject Matter Expert (SME).

Identify the core pillars for the skillset (e.g., `security`, `persistence`, `rest-api`, `testing`). Present pillar list to user for confirmation.

---

## ⏸️ Checkpoint: Confirm Pillars

```
"Proposed pillars for [target]: [list]
Looks right? (Y = proceed / N = adjust list)"
```

> Only proceed after user confirms the pillar list.

---

## Step 2 — Research & Analysis

// turbo
```bash
mkdir -p skills/<category>/{language,best-practices,tooling}
```

- Deep-dive official documentation, GitHub release notes, and community standards (e.g., "Uber Go Style Guide").
- Extract **High-Density rules** addressing common pitfalls and expert-level optimizations.
- Ask user for additional reference documents if domain is specialized.

---

## Step 3 — Pre-Drafting Strategy

Before writing, assess verbosity of target language:

| If target is... | Strategy |
|----------------|----------|
| Verbose (Java, Go, C#, XML) | Default to **Reference Extraction** — plan `references/implementation.md` immediately |
| Concise (Python, TS, Dart) | Inline examples ≤10 lines are acceptable |

> **Rule**: Never attempt to fit code >5 lines inline. Extract to `references/` immediately.

---

## Step 4 — Draft Skills (High-Density Standard)

Create `SKILL.md` for each pillar. **Constraints**:

- Body ≤ 100 lines (~500 tokens)
- Structure per pillar:
  - **Metadata**: triggers, keywords, file patterns
  - **Priority**: `## Priority: Px (LEVEL)` format
  - **Structure**: ASCII tree of expected file/folder layout
  - **Implementation Guidelines**: imperative mood, verb-first, no filler
  - **Anti-Patterns**: max 15 words each. Format: `**No X**: Do Y, not Z.`
  - **Code**: inline only if <10 lines; otherwise link to `references/`

---

## Step 5 — Reference Compression

Move heavy content out of `SKILL.md` body:

- Examples >10 lines → `references/examples.md`
- Checklists → `references/checklist.md`
- Implementation templates → `references/implementation.md`

Link to each reference from the main `SKILL.md`.

---

## Step 6 — Validation

// turbo
```bash
pnpm --filter ./cli run dev validate --all
```

- Check all skills pass structural validation.
- **Fallback**: If validator not found, manually verify: triggers present, priority set, anti-patterns formatted, body ≤100 lines.
- Run `code-review` workflow on any code examples in `references/`.

---

## Step 7 — Token Calculation

// turbo
```bash
pnpm calculate-tokens
```

- Verify token footprint per skill ≤ 500 tokens.
- **Fallback**: If script not found, count manually: `wc -l skills/<category>/*/SKILL.md`.
- If any skill exceeds limit, extract more content to `references/`.

---

## Step 8 — Finalize & Release

Deliverables checklist before closing:

- [ ] All `SKILL.md` files pass validation
- [ ] All anti-patterns use `**No X**: Do Y` format
- [ ] All code examples >10 lines are in `references/`
- [ ] Token footprint verified ≤500 tokens per skill
- [ ] `skills/metadata.json` updated with new category and version

Run `smart-release` workflow to bump version and update distribution artifacts.
