---
name: Skill Creator
description: Standards for creating new High-Density Agent Skills with optimal token economy, progressive disclosure, and anti-hallucination design. Activates when authoring a new SKILL.md.
metadata:
  labels: [meta, standard, instruction-design, prompt-engineering, token-efficient]
  triggers:
    files: ['SKILL.md', 'metadata.json']
    keywords: [create skill, new skill, write skill, high density, token economy, skill authoring, skill template]
    negative: ["user asks to review existing skill — use skill-review workflow", "user asks to review workflow — use workflow-review"]
---

# Agent Skill Creator Standard

## **Priority: P0 (CRITICAL)**

**This skill does NOT**: review existing skills — use `skill-review` workflow. Does not cover workflow authoring — use `workflow-review`.

**Compatible skills**: `agent-skills-architecture` (design pillars), `skill-review` workflow (validation), `skill-benchmark` workflow (effectiveness testing).

## Three-Level Loading

```
Level 1: Metadata (Triggers) → Proactive Activation
Level 2: SKILL.md Body (≤100 lines) → Core guidelines (when triggered)
Level 3: references/ → Deep knowledge (loaded only on demand)
```

## Size Limits (Strict)

| Element | Limit | Action if Exceeded |
|---------|-------|-------------------|
| SKILL.md total | 100 lines | Extract to `references/` |
| Inline code block | 10 lines | Move to `references/` |
| Anti-pattern item | 15 words | Compress to imperative |
| Tables | 8 rows | Extract to `references/` |

## Required Sections in SKILL.md

1. **Frontmatter**: `name`, `description`, `triggers` (files + keywords + `negative`).
2. **Priority**: P0 / P1 / P2 with one-line scope statement.
3. **"This skill does NOT"**: Explicit boundary — what this skill does NOT cover.
4. **Compatible skills**: List of related skills for cross-referencing.
5. **Guidelines**: Numbered/bulleted imperative steps. Each step = one action.
6. **Fallbacks**: `> **Fallback**: ...` for each step that can fail.
7. **Anti-Patterns**: `**No X`**: Do Y` format. ≤15 words each.
8. **Verification Checklist**: Pass/fail items. Objectively testable.
9. **References**: Links to `references/` files for heavy detail.

> To use the full template: `view_file .agent/skills/skill-creator/references/TEMPLATE.md`

## Writing Rules

- **Imperative mood**: Start with verbs. Never "Please" or "You should".
- **Token compression**: Skip articles where readable. Bullets > paragraphs (3× density).
- **Progressive disclosure**: Core in SKILL.md body. Examples in `references/`. Templates never loaded.

> For anti-pattern format examples: `view_file .agent/skills/skill-creator/references/lifecycle.md`

## Directory Structure

```text
skills/{category}/{skill-name}/
  ├── SKILL.md          # ≤100 lines
  ├── references/       # Heavy detail, lazy-loaded
  │   ├── TEMPLATE.md
  │   └── examples.md
  └── scripts/          # Executable automation, never loaded
```

## 🚫 Anti-Patterns

**`No Verbose SKILL.md`**: Body >100 lines → extract to `references/`. No exceptions.

**`No Missing Triggers`**: Every SKILL.md must have `files` + `keywords` + `negative` triggers.

**`No Missing Boundary`**: Every skill must state what it does NOT do.

**`No Conversational Style`**: Delete "In this skill, we..." → Never use intro sentences.

**`No Redundant Description`**: Frontmatter `description` is sufficient. Never repeat after Priority.

## ✅ Verification Checklist

- [ ] SKILL.md ≤100 lines
- [ ] Frontmatter has `name`, `description`, `triggers` with `files`, `keywords`, `negative`
- [ ] "This skill does NOT" boundary explicit
- [ ] Every guideline step has a `> **Fallback**` if it can fail
- [ ] Anti-patterns use `**No X**: Do Y` format ≤15 words
- [ ] Verification checklist present with pass/fail items
- [ ] `references/` folder created for any content >10 lines

## 📚 References

- [Full SKILL.md Template](references/TEMPLATE.md)
- [Lifecycle & Creation Guide](references/lifecycle.md)
- [Resource Organization](references/resource-organization.md)
