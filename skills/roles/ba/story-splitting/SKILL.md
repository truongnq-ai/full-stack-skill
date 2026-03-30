---
name: User Story Splitting
description: Analyzes monolithic feature requirements and splits them into independent, verifiable, and vertically sliced User Stories using standard agile patterns.
category: roles/ba
metadata:
  labels: [ba, story-splitting, agile, requirements, breakdown]
  triggers:
    priority: medium
    confidence: 0.9
    keywords: [split story, breakdown, decompose, vertical slice, monolithic]
---

# 🔪 User Story Splitting

> **Use this skill when**: an EPIC or drafted User Story is too large to fit in a single sprint (exceeds 5-8 story points), contains multiple independent workflows, or violates the INVEST principle. Trigger: `/ba-split-story`.
>
> **Out of scope**: This is NOT for breaking down technical tasks (like "Set up database"). It only splits Business Value slices (Vertical Splitting).

---

## 🚫 Anti-Patterns

- **Horizontal/Architectural Splitting**: Bad splitting: "US-1: Create DB table", "US-2: Create API", "US-3: Build UI". (This yields no independent business value).
- **Ignoring INVEST**: Creating stories that are dependent on each other strictly (violating the 'I' in INVEST).
- **No Traceability**: Deleting the Epic and forgetting to link the new split stories back to an overarching parent ID.
- **Copy/Paste ACs**: Lazily pasting the exact same Acceptance Criteria across all 4 split stories instead of isolating them.

---

## 🛠 Prerequisites & Tooling

1. Review the overarching requirement document (Epic or large Feature).
2. Familiarity with the `INVEST` framework (Independent, Negotiable, Valuable, Estimable, Small, Testable).
3. Connect with `skills/common/id-registry/SKILL.md` to generate new `US-XXX` IDs.

---

## 🔄 Execution Workflow

### Step 1 — Analyze the Monolith
Identify the splitting dimension using industry-standard patterns:
- **By User Role**: Standard User vs. Admin vs. Super Admin.
- **By Happy/Sad Path**: Core success flow first, error handling later.
- **By Data Scope**: View list first, filter/sort later.
- **By Interface/Channel**: Web first, Mobile-responsive later.
- **By Workflow Steps**: Step 1-2 of wizard first, Step 3-4 later.

### Step 2 — Construct Vertical Slices
Ensure each split is a Vertical Slice (contains UI, Backend, DB logic needed to function independently).
*Example Target*: "As an Admin, I can view the list of pending orders so I can pick them."

### Step 3 — Generate Independent ID Artifacts
Using the ID Registry, generate independent Markdown files for each split:
- `docs/specs/US-101-[Feature]-Core-Flow.md`
- `docs/specs/US-102-[Feature]-Error-Handling.md`
- `docs/specs/US-103-[Feature]-Admin-Overrides.md`

### Step 4 — Rewrite Acceptance Criteria (AC)
Distribute the ACs stringently.
If US-101 is "Core Flow", ensure the ACs only cover valid inputs and 200 OK outputs.
Move the 404/500/Validation error criteria strictly into US-102.

### Step 5 — Establish Linkage
In the metadata of `US-101`, `US-102`, etc., add:
```yaml
parent_epic: EPIC-05
related_stories: [US-102, US-103]
```

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| Unsplittable Atomic Feature | The logic is a complex algorithm that cannot functionally run partially. | Acknowledge it as an Atomic Spike. Convert it to a `TECH-SPIKE` document to resolve risk before attempting horizontal splits. |
| Extreme Coupling | Split A physically cannot be tested without Split B | Merge them back into a single story and warn the PM. Do not break strict Independent principle. |

---

## ✅ Done Criteria / Verification

A story splitting operation is complete when:

- [ ] All newly generated User Stories adhere to the INVEST principle (specifically: vertically sliced).
- [ ] No single story contains "Backend API only" or "UI Skeleton only" requirements.
- [ ] Parent/Child Traceability is injected via ID markers.
- [ ] The total combined scope of the child stories covers 100% of the original monolithic overarching requirement.
