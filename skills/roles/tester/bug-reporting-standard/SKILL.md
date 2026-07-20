---
name: Bug Reporting Standard
description: Enforces a strict, reproducible, and developer-friendly template for logging software defects.
category: roles/qa
metadata:
  labels: [qa, bug-report, defect, testing]
  triggers:
    priority: critical
    confidence: 0.95
    keywords: [report bug, log defect, issue found, broken feature]
---

# 🐛 Bug Reporting Standard

> **Use this skill when**: the agent discovers a failure during execution, code review, or testing and needs to formally report the defect to the development team. Trigger: `/qa-report-bug`.
>
> **Out of scope**: This is NOT for fixing the bug (use `software-dev-fix-bug.md`). This is purely for documentation and handoff tracking.

---

## 🚫 Anti-Patterns

- **"It doesn't work" syndrome**: Logging an issue without specifying the exact Environment, Browser, or OS version.
- **Untraceable Logs**: Stating there was an error but failing to attach the Stack Trace or console output.
- **Missing Baseline**: Providing the "Actual Result" without explaining what the "Expected Result" was based on the Acceptance Criteria.
- **Vague Steps**: Dropping a step (e.g., "Click checkout"). Did you click it with an empty cart or full cart?

---

## 🛠 Prerequisites & Tooling

1. Use `skills/common/id-registry/SKILL.md` to assign a standard tracking ID (e.g., `BUG-104`).
2. Identify the target markdown file or issue tracker integration point (e.g., `docs/qa/bugs/BUG-104.md`).

---

## 🔄 Execution Workflow

### Step 1 — Isolation & Verification
Before logging a bug, verify it is reproducible.
- Did it happen more than once?
- Is it a cache issue? (Simulate clearing cache/Hard refresh).
If it is intermittent (Heisenbug), state "Intermittent: Yes (~1 in 5 times)" clearly in the report.

### Step 2 — Generate Standardized Payload
Generate the Bug Report using this exact markdown schema:

```markdown
# [BUG-104] Payment gateway times out on invalid CVV

**Severity**: S2 - High (Impairs core flow)
**Environment**: Staging `v1.4.2-rc1` (Chrome v120 / macOS)
**Reporter**: QA_Agent

### Description
When submitting a checkout flow with an expired CVV, the system hangs infinitely instead of returning a validation error.

### Steps to Reproduce
1. Navigate to `/checkout`.
2. Populate valid shipping data.
3. Enter Credit Card `4111...1111`, Expiry `12/99`, CVV `000` (Intentional fail).
4. Click 'Pay Now'.
5. Wait 60 seconds.

### Expected Result
The `/api/charge` endpoint should immediately return `HTTP 400 Bad Request` and the UI should render "Invalid CVV".

### Actual Result
The UI spinner hangs indefinitely. Network tab shows API connection timed out (`HTTP 504 Gateway Timeout`).

### Logs & Evidence
```json
{ "error": "upstream request timeout" }
```
```

### Step 3 — Establish Traceability
Link the bug to the User Story or Test Case it violates.
Example: `> Violates Acceptance Criteria 3 of [US-042]`

### Step 4 — Triage Handoff
Notify the QA Lead or Dev Manager to prioritize the bug using `skills/roles/qa/bug-triage/SKILL.md`.

---

## ⚠️ Error Handling (Fallback)

| Scenario | Encountered | Fallback Action |
|----------|-------------|-----------------|
| Missing Environment | The agent doesn't know what server they tested on | Default to `Environment: Unknown/Local` and flag it aggressively for the developer to verify on their local machine. |
| Cannot Duplicate | Agent finds a bug but second run passes | Log it anyway as `SEV-4 (Unverified Intermittent)` to maintain a paper trail. |

---

## ✅ Done Criteria / Verification

A bug is considered successfully reported when:

- [ ] It contains a prefixed ID (`BUG-XXX`).
- [ ] Steps to reproduce are numbered and executable by a naive third party.
- [ ] Both Expected and Actual results are explicitly defined.
- [ ] Logs, snippets, or screenshots are attached if relevant.
