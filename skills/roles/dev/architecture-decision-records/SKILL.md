---
name: Architecture Decision Records (ADRs)
description: A formalized method for capturing, documenting, and standardizing major technical decisions to prevent historical amnesia.
category: roles/dev
metadata:
  labels: [dev, architecture, adr, documentation, decision-log]
  triggers:
    priority: medium
    confidence: 0.9
    keywords: [adr, architecture decision, why did we choose, technical decision]
---

# 🏛️ Architecture Decision Records (ADRs)

> **Use this skill when**: the engineering team makes a significant technical choice (e.g., "Switching from REST to GraphQL", "Adopting Tailwind CSS", or "Moving to a Microservices architecture"). Trigger: `/dev-write-adr`.
>
> **Out of scope**: This is NOT for minor code choices like "Why I used a `forEach` instead of a `map` loop". This is for systemic, project-scale paradigms.

---

## 🚫 Anti-Patterns

- **Tribal Knowledge**: A Senior Dev chooses Postgres over MongoDB during a 5-minute coffee chat. Two years later, they leave, and the new team spends 3 weeks debating whether to switch to MongoDB.
- **The Empty "Why"**: Stating *what* the decision was without explaining *why* it was chosen over the alternatives.
- **Editing History**: Going back and editing a 2-year-old ADR to make the team look smarter because the market shifted. ADRs are immutable historical logs.

---

## 🛠 Prerequisites & Tooling

1. A designated `docs/adr/` folder in the project repository.
2. The standard MADR (Markdown Architecture Decision Record) template.

---

## 🔄 Execution Workflow

### Step 1 — Identify the Need
Trigger an ADR if the decision meets any of these criteria:
- Will it take > 1 week for a team to reverse this decision?
- Does it fundamentally change how data is stored or transported?
- Does it introduce a new heavy dependency (e.g., Redis, Kafka)?

### Step 2 — Draft the MADR Artifact
Create a new sequential file: `docs/adr/0015-adopt-graphql-for-mobile.md`.

*Required Sections:*
1. **Title**: Short and descriptive.
2. **Context**: What is the business problem? (e.g., "Mobile app payload sizes are 5MB, causing slow loads on 3G limits").
3. **Considered Options**: List all choices evaluated (e.g., gRPC, GraphQL, REST + Field Filtering).
4. **Decision**: What was chosen and *why*. What was the deciding metric?
5. **Consequences (Positive & Negative)**: Be honest. (e.g., "Positive: Payload drops to 1MB. Negative: Devs must learn resolver logic, increasing onboarding time").

### Step 3 — Peer Review & Approval
Merge the ADR via a standard Pull Request. It requires approval from the Tech Lead or Staff Engineer. Once merged, it becomes organizational law.

### Step 4 — Superseding (Retirement)
If the team realizes 3 years later the decision was wrong, do NOT edit file `0015`.
Create `docs/adr/0042-revert-to-rest-apis.md`.
Inside `0042`, explicitly state: `Supersedes ADR 0015.`
Inside `0015`, append a note: `Status: Superseded by ADR 0042.`

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| Analysis Paralysis | The team has debated between standard AWS RDS and Aurora for 3 weeks | The Tech Lead must explicitly step in, invoke the "Disagree and Commit" protocol, write the ADR selecting one, and force the team forward. Indecision is worse than a slightly suboptimal choice. |

---

## ✅ Done Criteria / Verification

An ADR is considered formalized when:

- [ ] It resides in the version-controlled `docs/adr/` directory with a sequential ID number.
- [ ] At least 2 alternatives were explicitly analyzed and rejected in the text.
- [ ] The negative consequences (trade-offs) of the chosen path are clearly acknowledged.
