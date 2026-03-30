---
name: Cross-Role Communication Contract
description: Standardizes terminology, formats, and handoff protocols between BA, Dev, QA, and DevOps inside agentic workflows.
category: common
metadata:
  labels: [communication, handoff, standardization, team-contract]
  triggers:
    priority: high
    confidence: 0.8
    keywords: [communication, contract, handoff, terms, terminology]
---

# 🗣️ Cross-Role Communication Contract

> **Use this skill when**: the agent must pass output from one domain to another (e.g., BA handing off requirements to Developer, Developer handing off to QA). Trigger: `/core-comm-contract`.
>
> **Out of scope**: This is not an external communication protocol (e.g., emailing clients). It governs internal artifact structure and definitions.

---

## 🚫 Anti-Patterns

- **Term Confusion**: Developer using "Unit Test" to describe what QA calls a "Component Test".
- **Silent Handoffs**: Updating a PR status to `Ready for QA` without linking the deployment Environment or the specific Acceptance Criteria identifiers.
- **Unstructured Payloads**: Free-texting a bug report to DevOps instead of using the structured Markdown template with reproducible steps.
- **Assumption Passing**: BA handing off a User Story saying "Make the dashboard fast" without a measurable Non-Functional Requirement (NFR).

---

## 🛠 Prerequisites & Tooling

1. Knowledge of exact project vocabulary defined in the repository glossaries (if any: `docs/GLOSSARY.md`).
2. Adherence to structured identifiers provided by `skills/common/id-registry/SKILL.md`.

---

## 🔄 Execution Workflow

### Step 1 — Establish State Transition
Whenever work shifts between roles (BA → Dev, Dev → QA, QA → DevOps), a formal State Transition artifact must be verified. 
*Example*: A feature is NOT `In-QA` until the Developer provides the Environment URL and the Target Branch.

### Step 2 — Standardize Payloads
Enforce strict Payload formats based on the target role:

**BA → Dev (Implementation Handoff)**
- Must include: `[Story ID]`, `[Acceptance Criteria List]`, `[Figma/Design Link]`, `[API Dependencies]`.

**Dev → QA (Testing Handoff)**
- Must include: `[PR Link]`, `[Environment/Staging URL]`, `[Database State requirement]`, `[Feature Flags to enable]`.

**QA → Dev/DevOps (Bug/Incident Report)**
- Must include: `[Severity S1-S4]`, `[Expected/Actual Result]`, `[Steps to Reproduce]`, `[Logs/Screenshots]`.

### Step 3 — Terminology Alignment
Resolve ambiguities immediately using the Contract Glossary:
| Ambiguous Term | Replaced by Contract Term |
|----------------|---------------------------|
| "It broke" | 500 Internal Server Error, App Crash, UI Freeze |
| "The server" | Application Container, Database Instance, Load Balancer |
| "Test it" | Execute Regression Suite, Perform UAT, Smoke Test |
| "Done" | Code Merged, Deployed to Prod, Passed QA |

### Step 4 — Checkpoint Sign-Off
Before considering a cross-role conversation "resolved", require an explicit ACK (Acknowledgment).
If acting as a Subagent Orchestrator, require the subagent to return `"ACK: Contract Received"` before proceeding.

---

## ⚠️ Error Handling (Fallback)

| Failure | Condition | Fallback Action |
|---------|-----------|-----------------|
| Missing Payload | Handoff document is missing the ID or URL | The receiving agent must immediately Reject the transition and request the missing elements citing the Contract. |
| Term Clash | Role uses undefined terminology | Query `grep_search` across `docs/` to find precedent, otherwise ask User for strict definition to update the glossary. |

---

## ✅ Done Criteria / Verification

A communication handoff is verified when:

- [ ] All required specific fields for the role-transition (payload) are present and populated.
- [ ] Zero ambiguous terms are used in the transition document.
- [ ] Universal identifiers (e.g., US-101, BUG-40) are used instead of generic "the login feature".
- [ ] Acknowledgment is received by the target role/agent, validating the receipt.
