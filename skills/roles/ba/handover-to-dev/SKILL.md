---
name: BA-to-Dev Handoff Protocol
description: Structured methodology for transferring Business Requirements into Developer-ready Acceptance Criteria with extreme precision.
category: roles/ba
metadata:
  labels: [ba, dev, handoff, requirements, agile]
  triggers:
    priority: critical
    confidence: 0.9
    keywords: [handoff, ba to dev, developer ready, hand-over, spec]
---

# 🤝 BA-to-Dev Handoff Protocol

> **Use this skill when**: the Business Analyst finishes writing a spec, User Story, or PRD and needs to pass it strictly to the Development workflow. Trigger: `/ba-handoff`.
>
> **Out of scope**: This is NOT for writing code. This is the quality-gate *before* code is written. It does not dictate system architecture.

---

## 🚫 Anti-Patterns

- **Fuzzy Spec**: Handing off a requirement that says "Make it fast" instead of "API response time < 200ms at 95th percentile."
- **Missing Edge Cases**: Forgetting to define what happens during a timeout, a 404, or invalid validation input.
- **Untraceable IDs**: Writing a specification without generating a strict ID (e.g., `US-105`) via the ID Registry.
- **Assuming Technical Implementation**: Dictating *how* (e.g., "Use a Redis cache") instead of *what* (e.g., "Must persist session across restarts") unless explicitly defined as an architectural constraint.

---

## 🛠 Prerequisites & Tooling

1. The target User Story or PRD markdown file (e.g., `docs/specs/US-105-checkout.md`).
2. Familiarity with `skills/common/communication-contract/SKILL.md` (Ensures terms match).
3. Access to `skills/common/id-registry/SKILL.md` (Ensures IDs match).

---

## 🔄 Execution Workflow

### Step 1 — Readiness Audit (The BA Gate)
Before invoking Developer agents or assigning the ticket, parse the specification. Does it have:
- [ ] A definitive ID and Title?
- [ ] A clear Business Value / Objective?
- [ ] Explicit Acceptance Criteria in Given/When/Then (BDD) format?
- [ ] Out-of-Scope definitions?
- [ ] Non-Functional Requirements (NFR)?

*Action*: If any are missing, halt the handoff and prompt the BA agent/user to rewrite the spec.

### Step 2 — Edge Case Extraction
Automatically inject a checklist of Edge Cases for the Developer to consider:
- Network Failure (Offline state, 500 API errors).
- Data Boundary (Empty lists, 0-value items, extremely long text wrapping).
- Security (Role-based access checks omitted by mistake).
Append this to the spec under `## Developer Edge Case Checklist`.

### Step 3 — Dependency Mapping
Scan the requirement for implicit dependencies:
If it says "Send Email", ensure `[API: Sendgrid/SMTP]` is flagged as a dependency.
If it says "Store History", flag `[Database Schema Update required]`.

### Step 4 — Formulate the Handoff Payload
Create the definitive Handoff YAML or Markdown block at the bottom of the spec:
```yaml
handoff_status: READY_FOR_DEV
target_role: Developer
id: US-105
date_handed_over: 2026-03-30
complexity_estimate: Medium
approved_by: BA_Agent
```

### Step 5 — Notify Developer Handlers
Log the successful handoff in the main `task.md` by moving it from `[ ] Spec Writing` to `[ ] Dev Implementation: US-105`.

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| Failed Audit | Missing Acceptance Criteria | Do NOT mark as Ready. Generate a markdown comment inside the spec highlighting exactly what is missing and switch state to `NEEDS_REVISION`. |
| Unclear Tech | Spec dictates forbidden architecture | Append a warning flag for the Architect/Lead Dev to review before normal Dev assignment. |

---

## ✅ Done Criteria / Verification

The handoff is considered legally complete when:

- [ ] The payload strictly conforms to the BA-to-Dev contract.
- [ ] Gherkin syntax (Given/When/Then) or bulleted ACs are 100% testable.
- [ ] The master tracker (`task.md`) is updated reflecting the State Transition.
