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
    file_patterns: ["docs/rfc/**", "docs/design/**", "**/spec/**"]
    context: ["user submits a technical spec", "user asks for architecture review", "user proposes a new system design"]
    negative: ["user asks for line-by-line code review", "user asks to implement code"]
---

# 📐 Design Review Checklist

> **Use this skill when**: a developer submits a Technical Spec, RFC (Request for Comments), or System Design Document for a new Epic or major feature. Trigger: `/dev-design-review`.
>
> **Out of scope**: Detailed line-by-line code review (`code-review-etiquette/SKILL.md`). This occurs days or weeks BEFORE code is written.

---

## 🚫 Anti-Patterns

- **Coding Without a Design**: Skipping the spec entirely for a 3-month project, resulting in a misaligned architecture that has to be rewritten entirely by QA phase.
- **The Echo Chamber**: Reviewing your own architectural design or only asking Junior developers who lack the experience to challenge the fundamental constraints.
- **Buzzword Driven Development**: Approving a design that uses Kafka, Redis, and Kubernetes for an internal tool that expects 5 users a day.

---

## 🛠 Prerequisites & Tooling

1. A written Technical Specification or System Design Document.
2. Architecture Diagrams (C4 model, Entity-Relationship mapping, Sequence diagrams).

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

> **⏸️ Checkpoint**:
> "Design review hoàn tàt: [N] concerns, [M] approved sections. Bạn có muốn tôi document kết quả Go/No-Go không? (Y/N)"

---

## 🛠️ Tooling & Execution

- **Read Spec**: Use `view_file` to read the submitted technical spec or RFC document.
- **Diagram Analysis**: Use `view_file` on architecture diagrams (Mermaid, C4).
- **Schema Check**: Use `call_mcp_tool` → `postgres/query` or `mysql/mysql_query` to verify existing schema if needed.
- **Cross-Reference**: Use `grep_search` to find related API contracts or existing implementations.

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

---

## 📚 Cross-References

- `roles/dev/api-contract/SKILL.md` — API contracts are validated during design review.
- `roles/dev/architecture-decision-records/SKILL.md` — Major decisions from this review are recorded as ADRs.
- `roles/dev/security-basics/SKILL.md` — Security & compliance is a mandatory review dimension.
- `roles/dev/performance-engineering/SKILL.md` — Scalability concerns raised here feed into performance guardrails.
