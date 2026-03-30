---
description: BA splits large user stories into small, independently deliverable stories using proven splitting patterns.
---

# ✂️ BA Story Splitting

> **Use this workflow when**: BA has large epics or stories that need to be broken into smaller, estimable, independently testable stories. Trigger: `/software-ba-split-stories`.
>
> **Out of scope**: Does not gather requirements — use `software-ba-gather-requirements`. Does not estimate effort — handled by dev team during sprint planning.
>
> **Activates skill**: `skills/roles/ba/story-splitting/SKILL.md`

---

## Step 1 — Load Splitting Skill

```
view_file skills/roles/ba/story-splitting/SKILL.md
view_file skills/roles/ba/story-splitting/references/examples.md
```

> **Fallback**: If skill missing, apply INVEST criteria manually: Independent, Negotiable, Valuable, Estimable, Small, Testable.

---

## Step 2 — Analyze Source Story

Read the epic or large story. Extract:

- **Scope**: How many acceptance criteria?
- **Complexity signals**: Multiple actors? Multiple platforms? Multiple states?
- **Splitting candidates**: Identify natural seams

> **Rule**: Any story with >5 acceptance criteria or >2 actors is a splitting candidate.

---

## Step 3 — Apply Splitting Patterns

Use these patterns in priority order:

| Pattern | When to Use | Example |
|---------|------------|---------|
| **By workflow step** | Feature has sequential steps | Create → Review → Approve |
| **By actor/role** | Multiple users interact | Admin vs Customer view |
| **By data variation** | Different input types | Credit card vs Bank transfer |
| **By platform** | Web + Mobile differ | Mobile-first then Desktop |
| **By business rule** | Complex conditions | Basic flow then edge cases |
| **Happy path first** | Clear main flow exists | Success then error handling |

Generate child stories in format:

```
### Story: [Title]
**As a** [actor], **I want to** [action], **so that** [value].
**AC**: [single testable criterion]
**Dependencies**: [parent story or none]
```

---

## ⏸️ Checkpoint: Validate Split

```
"Original story split into [N] child stories:
1. [Story title] — AC: [N]
2. [Story title] — AC: [N]
...

Each story is independently testable? (Y / N — re-split)"
```

---

## Step 4 — Dependency Mapping

Create dependency graph:

```
Story A (no deps) → Story B (depends on A) → Story C (depends on B)
Story D (parallel to A)
```

Identify:
- Stories that can be done in parallel
- Critical path (longest dependency chain)
- Stories that unblock the most work

---

## Step 5 — Save Split Stories

Save to `docs/specs/stories-[feature_name].md`:

```
## Story Splitting — [Feature Name] — [Date]

### Original Story
[summary]

### Child Stories
[numbered list with AC and dependencies]

### Dependency Graph
[ASCII or mermaid diagram]

### Recommended Execution Order
[prioritized list considering dependencies and value]
```

---

## Done Criteria

- [ ] Each child story has exactly 1–3 acceptance criteria
- [ ] Each child story passes INVEST check
- [ ] Dependency graph created
- [ ] Execution order recommended
- [ ] `docs/specs/stories-[feature_name].md` saved
