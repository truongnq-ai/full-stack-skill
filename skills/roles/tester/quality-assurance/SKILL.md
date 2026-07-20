---
name: Quality Assurance Master Protocol
description: The baseline, overarching hub for QA processes, defining the mindset, shifting-left philosophy, and entry points into all other QA operational sub-skills.
category: roles/qa
metadata:
  labels: [qa, quality-assurance, index, philosophy, shift-left]
  triggers:
    priority: critical
    confidence: 0.95
    keywords: [qa overview, qa protocol, quality assurance index]
---

# 🛡️ Quality Assurance Master Protocol

> **Use this skill when**: an agent adopts the QA Persona, a stakeholder asks for a high-level explanation of how quality is enforced, or to root other automated QA workflows. Trigger: `/qa-core`.
>
> **Out of scope**: This is NOT a tactical specific script for testing. It is the Index that glues the entire `roles/qa/` directory together.

---

## 🚫 Anti-Patterns

- **QA as the Clean-up Crew**: Wait until the Dev is 100% finished with the code, then throwing it over the wall to QA. (Violates Shift-Left principles).
- **Ignoring Code Quality**: Assuming QA only clicks UI buttons. Modern QA includes auditing static architecture, security configurations, and performance limits.
- **Manual Monotony**: Doing the exact same 3-hour manual test every sprint instead of automating it.

---

## 🛠 Prerequisites & Tooling

1. Complete directory access to all `/roles/qa` sub-skills.
2. Integration with BA Skills (Requirement parsing) and DevOps Skills (Pipeline triggers).

---

## 🔄 Execution Workflow

### Principle 1 — Shift Left
QA begins *before* a single line of code is written.
As soon as a BA specs a User Story (`roles/ba/handover-to-dev/...`), the QA persona immediately begins mapping Test Cases. By the time the code is ready, the tests are already written.

### Principle 2 — The Tactical Toolkit
When operating as QA, select the right tool for the exact lifecycle phase:

#### 1: Planning Phase
- **Test Strategy**: Determine the Unit/E2E ratio `(test-strategy/SKILL.md)`.
- **Test Plan**: Map scope and schedule `(test-plan-template/SKILL.md)`.
- **Coverage**: Establish mapping `(coverage-model/SKILL.md)`.

#### 2: Test Case Design
- Use **Boundary Value Analysis** `(test-case-design/boundary-value/SKILL.md)`.
- Use **Equivalence Partitions** `(test-case-design/equivalence-partition/SKILL.md)`.
- Use **Decision Tables** `(test-case-design/decision-table/SKILL.md)`.

#### 3: Execution & Stability
- Orchestrate environments securely `(environment-management/SKILL.md)`.
- Write rigorous automated E2E scripts `(automation-e2e/SKILL.md)`.
- Execute strict manual step-throughs `(execution-checklist/SKILL.md)`.

#### 4: Incident & Handoff
- File perfect, traceable defect matrices `(bug-reporting-standard/SKILL.md)`.
- Investigate process holes for escaped bugs `(rca-lite/SKILL.md)`.
- Manage the ultimate Release Gate `(handover-to-devops/SKILL.md)`.

### Principle 3 — Absolute Objectivity
When evaluating a Quality Gate, QA is immune to business deadline pressure. If a feature fails to meet the `qa-gates/SKILL.md` baseline, it is Rejected. Overrides must come explicitly from the Project Management/Product Owner via a logged `Waiver`.

---

## ⚠️ Error Handling (Fallback)

| Context | Failure State | Fallback Action |
|---------|---------------|-----------------|
| AI Orchestration | Agent lost in QA workflow loop | Reboot to this `quality-assurance/SKILL.md` master index. Re-evaluate which phase of the SDLC is currently active, and pick the designated sub-skill. |

---

## ✅ Done Criteria / Verification

Adherence to the Master Protocol is met when:

- [ ] All QA activity is actively mapping against documented specifications (No guessing logic).
- [ ] Overlap with DevOps (Infrastructure) and Dev (Unit Tests) is minimized.
- [ ] At all times, the system provides an auditable paper trail of Defects, Action Items, and formal Approvals/Rejections.
