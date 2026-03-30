---
description: BA elicits requirements from stakeholders through structured interview, scenario decomposition, and edge case discovery.
---

# 📝 BA Requirements Gathering

> **Use this workflow when**: BA needs to collect, analyze, and validate requirements from stakeholders before development. Trigger: `/software-ba-gather-requirements`.
>
> **Out of scope**: Does not write PRD — use `software-po-plan-feature`. Does not split stories — use `software-ba-split-stories`. Does not design API — use `software-dev-design-api`.
>
> **Activates skills**: `skills/roles/ba/requirements-elicitation/SKILL.md`, `skills/roles/ba/system-modeling/SKILL.md`, `skills/roles/qa/business-analysis/SKILL.md`

---

## Step 1 — Load BA Skills

```
view_file skills/roles/ba/requirements-elicitation/SKILL.md
view_file skills/roles/ba/system-modeling/SKILL.md
```

> **Fallback**: If skill files missing, use manual protocol: (1) identify actors, (2) define interactions, (3) map constraints, (4) validate edge cases.

---

## Step 2 — Stakeholder Interview

Conduct structured discovery covering:

| Area | Questions |
|------|-----------|
| **Problem** | What problem does this solve? Who experiences it? How often? |
| **Actors** | Who interacts with this feature? What permissions per actor? |
| **Flows** | What is the happy path? What are alternate paths? |
| **Constraints** | Business rules? Regulatory requirements? Platform parity (Web vs Mobile)? |
| **Data** | What data is created/read/updated/deleted? What formats? |

> **Rule**: Minimum 7 clarifying questions before proceeding. Document every answer.

---

## Step 3 — Deep Analysis

Apply `skills/roles/qa/business-analysis/SKILL.md`:

- **Atomic Decomposition**: Split acceptance criteria into single-condition logic units
- **Variable Identification**: Extract toggles, market rules, user roles
- **Platform Parity Audit**: Flag divergent Web vs Mobile behavior
- **Truth Table Verification**: Map complex logic to truth tables

```
view_file skills/roles/qa/business-analysis/references/logic_truth_tables.md
```

> **Fallback**: If reference missing, construct truth table manually for conditions with ≥3 variables.

---

## ⏸️ Checkpoint: Validate Requirements

```
"Requirements analysis complete:
- Actors identified: [N]
- User flows documented: [N]
- Acceptance criteria: [N] (atomic)
- Edge cases discovered: [N]
- Open questions: [N]

All questions resolved? (Y / N — investigate further)"
```

---

## Step 4 — Edge Case Discovery

- **State Validation**: Verify behavior across all entity states (active, suspended, deleted)
- **Boundary Detection**: Currency limits, date ranges, character counts
- **Null Safety**: Missing data, empty lists, network failures
- **Authorization**: Unauthorized access paths, role escalation

Document each edge case with expected behavior.

---

## Step 5 — Requirements Document

Save to `docs/specs/requirements-[feature_name].md`:

```
## Requirements — [Feature Name] — [Date]

### Actors & Permissions
### User Flows (Happy + Alternate)
### Acceptance Criteria (Atomic)
### Edge Cases & Boundary Conditions
### Open Questions (if any)
### Platform Parity Notes
```

---

## Done Criteria

- [ ] `docs/specs/requirements-[feature_name].md` saved
- [ ] All acceptance criteria are atomic (single-condition)
- [ ] Edge cases documented with expected behavior
- [ ] Zero open questions remaining (or explicitly flagged as blockers)
