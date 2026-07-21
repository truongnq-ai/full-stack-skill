---
name: Design Review Checklist
description: A formalized process for reviewing architectural and system design proposals before writing application code.
category: roles/dev
metadata:
  labels: [dev, design-review, architecture, planning, system-design]
  triggers:
    priority: medium
    confidence: 0.95
    keywords: [design review, architecture review, system design, technical spec]
---

# 📐 Design Review Checklist

> **Use this skill when**: a developer submits a Technical Spec, RFC (Request for Comments), or System Design Document for a new Epic or major feature. Trigger: `/dev-design-review`.
>
> **Out of scope**: Detailed line-by-line code review (`code-review-etiquette/SKILL.md`). This occurs days or weeks BEFORE code is written.

---

## 🚫 Anti-Patterns

| ID | Anti-Pattern | Why It's Dangerous |
|----|---|---|
| **P0** | **Coding Without a Design** — Skipping the spec for a 3-month project. | Misaligned architecture discovered at QA; costly rewrite. |
| **P1** | **The Echo Chamber** — Only asking junior devs who can't challenge constraints. | Fundamental flaws go undetected until production. |
| **P1** | **Buzzword Driven Development** — Kafka + Redis + K8s for a 5-user internal tool. | Over-engineered; maintenance cost dwarfs value. |

---

## 🛠 Prerequisites & Tooling

1. A written Technical Specification or System Design Document.
2. Architecture Diagrams (C4 model, Entity-Relationship mapping, Sequence diagrams).

### Required Tools

| Tool | Purpose |
|------|--------|
| `view_file` | Read the Technical Spec and architecture documents. |
| `grep_search` | Search codebase for existing patterns that the design should align with. |
| `write_to_file` | Generate design review artifact with go/no-go decision. |
| `ask_question` | Present design trade-offs to the team for decision. |

---

## 🔄 Execution Workflow

### Step 1 — Review the "Why" (Business Context)
The design must explicitly state the problem it solves. Check if the proposed complexity matches the business value. If the business asks for a bicycle, do not approve a design for a nuclear submarine.

### Step 2 — Data Architecture & Schema Validation
This is the hardest thing to change later.
- Does this schema normalization make sense?
- Are foreign keys correctly established?
- *Scale Test*: If this table hits 10 million rows, what index is required to prevent a 5-second query timeout?

### Step 3 — System Integration & API Contracts
Review the boundaries.
- Does the proposed API match Restful/GraphQL standards? (`api-contract/SKILL.md`)
- How does the system handle an external dependency failure? (e.g., Stripe goes down, what happens to the checkout?)

### Step 4 — Security & Compliance Check
- What PII (Personally Identifiable Information) is being touched?
- Is data encrypted at rest?
- How is the user authorized to perform this new action? (`security-basics/SKILL.md`)

### Step 5 — Observability & Rollout
- How will the team know if this feature is broken in production? What Logs/Metrics are being emitted?
- What is the step-by-step deployment plan? Can it be rolled back safely?

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| The Endless Debate | The review turns into a 3-week argument over framework choices | Escalate to the Tech Lead. Invoke the ADR protocol (`architecture-decision-records/SKILL.md`). Set a hard deadline: "We make a final decision by Friday EOD." |

---

## ✅ Done Criteria / Verification

A Design Review is complete when:

- [ ] All major scalability and security constraints have been challenged and documented.
- [ ] Database schema choices and API contracts have been explicitly approved.
- [ ] A formal "Go / No-Go" decision is recorded, unblocking development.
- [ ] Observability and rollback plan reviewed.
- [ ] PII/compliance implications assessed.

---

## 📚 References

- [API Contract Skill](../api-contract/SKILL.md) — Reviewing API design specifics.
- [Architecture Decision Records](../architecture-decision-records/SKILL.md) — Documenting design decisions.
- [Security Basics Skill](../security-basics/SKILL.md) — Security review checklist.
- C4 Model: https://c4model.com/
- "Designing Data-Intensive Applications" by Martin Kleppmann.
