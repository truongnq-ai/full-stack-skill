---
description: "Write user-facing documentation: feature guides, how-to tutorials, onboarding manuals, and FAQ."
---

# ✍️ Writer: User Manuals & Knowledge Base

> **Use this workflow when**: Writer needs to create user-facing documentation — onboarding guides, how-to tutorials, feature walkthroughs, FAQ articles, or knowledge base entries. Trigger: `/software-writer-user-manuals`.
>
> **Out of scope**: Does not write technical API docs — use `/software-writer-api-docs`. Does not write infrastructure ADRs — use `/software-writer-infra-docs`. Does not write code comments/JSDoc — use `/software-writer-update-docs`.
>
> **Activates skills**: `skills/roles/writer/user-manuals/SKILL.md`, `skills/common/documentation/SKILL.md`

---

## Step 1 — Load Skills & Define Audience

```
view_file skills/roles/writer/user-manuals/SKILL.md
view_file skills/common/documentation/SKILL.md
```

Clarify before writing:
- **Audience**: End user (non-technical) / Admin / Developer onboarding
- **Format**: Tutorial (task-oriented) / Reference (lookup) / How-to (problem-oriented) / FAQ
- **Length**: Short (< 500 words) / Medium (500–1500) / Long-form (> 1500)

> **Rule**: If audience or format is unclear, ask before writing. Wrong audience = unusable doc.

---

## Step 2 — Outline & Structure

Create document outline before writing full content:

```markdown
# <Feature/Topic Name>

## Overview (1 paragraph — what this is and who needs it)
## Prerequisites (what the user must have ready)
## Step-by-Step Guide
  ### Step 1: <verb phrase>
  ### Step 2: <verb phrase>
## Common Issues / FAQ
## Related Resources
```

> **Rule**: Each step must start with an action verb (Click, Navigate, Enter, Select). No passive voice.

---

## Step 3 — Write Content

Follow writing standards:
- **Plain language**: Sentences < 20 words. Avoid jargon unless defined.
- **Screenshots / Diagrams**: Reference placeholder `[Screenshot: <description>]` where visuals are needed.
- **Code examples**: Use fenced code blocks with exact copy-paste commands.
- **Callouts**: Use `> ⚠️ Warning` for destructive actions, `> 💡 Tip` for shortcuts.

---

## ⏸️ Checkpoint: Content Review

```
"Draft complete:
- Audience: [End User / Admin / Developer]
- Format: [Tutorial / Reference / How-to / FAQ]
- Sections: [N] sections, ~[N] words
- Screenshots needed: [N] placeholders

Approve and save? (Y / N — revise first)"
```

---

## Step 4 — Save & Categorize

Save to appropriate path:
- Onboarding / Getting Started → `docs/guides/getting-started.md`
- Feature-specific → `docs/guides/<feature-name>.md`
- FAQ → `docs/faq.md`
- Knowledge base → `docs/kb/<category>/<article>.md`

Update navigation index if applicable:
```bash
echo "- [<Title>](<path>)" >> docs/guides/README.md
```

---

## Step 5 — Quality Check

```bash
# Lint markdown for formatting issues
npx markdownlint-cli2 "docs/**/*.md" 2>/dev/null || echo "Install: npm i -g markdownlint-cli2"

# Word count check
wc -w <output-file>.md
```

| Doc type | Target word range |
|---|---|
| Getting started | 300–800 |
| Feature guide | 500–1500 |
| FAQ article | 100–400 |

---

## Done Criteria

- [ ] Correct audience and format identified before writing
- [ ] All steps use action verbs (imperative mood)
- [ ] Code examples are copy-pasteable and tested
- [ ] Screenshot placeholders included where UI is referenced
- [ ] File saved to correct docs path with index updated

> **Required Skill**: `skills/roles/writer/user-manuals/SKILL.md`
