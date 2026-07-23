---
name: Handover to QA
description: The developer protocol bridging Code Complete and QA Testing, ensuring testers are unblocked and fully contextualized.
category: roles/dev
metadata:
  labels: [dev, qa, handover, testing, definition-of-done]
  triggers:
    priority: medium
    confidence: 0.95
    keywords: [handover to qa, ready for test, merge to staging, test this]
    file_patterns: ["**/staging/**", "**/test/**"]
    context: ["user says feature is done", "user asks to hand over to QA", "PR merged to staging"]
    negative: ["user asks QA to write tests", "user asks about test automation"]
---

# 🏈 Handover to QA (Developer Duty)

> **Use this skill when**: your PR has been approved, merged, and automatically deployed to the Staging/QA environment. You must now formally transfer ownership to the QA team. Trigger: `/dev-handover-qa`.
>
> **Out of scope**: QA actually doing the testing (`roles/qa/exploratory-testing/SKILL.md`). This describes the *Developer's* responsibility to prepare QA.

---

## 🚫 Anti-Patterns

- **The Ghost Deploy**: Merging code, dragging the Jira ticket to "Ready for QA", and going out to lunch without telling anyone. QA spends 4 hours figuring out which environment it's on.
- **"Just test the Happy Path"**: Assuming QA magically knows the edge cases you discovered during coding but forgot to document.
- **The Broken Build Handover**: Handing over a feature that instantly crashes on boot in the Staging environment because you only tested it on `localhost`.

---

## 🛠 Prerequisites & Tooling

1. A Staging environment successfully updated with your feature branch code.
2. Jira (or equivalent ticket tracker) integrated with your Git provider.

---

## 🔄 Execution Workflow

### Step 1 — Verify the Staging Build
Before messaging anyone, open the Staging URL yourself.
Verify that the new button actually renders. Ensure no environmental variables are missing. Do not farm out basic deployment verification to QA.

### Step 2 — The Handover Payload
When transitioning the ticket, leave a mandatory QA comment containing:
1. **Target Environment**: Explicit URL or App Build Number (e.g., `Staging V2.1.0 build 42`).
2. **What Changed (TL;DR)**: Plain English summary (e.g., "Added a discount code field to the checkout page").
3. **Where to Focus**: (e.g., "Focus on the Cart totals calculation").
4. **Known Blindspots**: (e.g., "I haven't tested this on Firefox, please verify browser compatibility").

### Step 3 — Provide Data & State (CRITICAL)
If your feature requires a User to have 5 orders and an expired credit card to trigger:
**Do not make QA set that up.**
Provide them with test credentials or exact database seed scripts in the handover comment:
`Use username test-declined@example.com (Password123) to trigger the error state.`

### Step 4 — Standby for Triage
When QA begins testing, remain highly responsive. The first 30 minutes of QA testing often reveal environmental blockers (wrong API keys, missing DB columns). Responding in 5 minutes saves hours of QA downtime.

> **⏸️ Checkpoint**:
> "Handover payload đã chuẩn bị xong: environment URL, test data, known blindspots. Bạn có muốn tôi post comment lên Jira ticket không? (Y/N)"

---

## 🛠️ Tooling & Execution

- **Verify Staging**: Use `call_mcp_tool` → `ssh/ssh_exec` to check if the staging deployment is healthy.
- **Test Data Setup**: Use `call_mcp_tool` → `postgres/query` or `mysql/mysql_query` to seed test data.
- **Read Deployment**: Use `call_mcp_tool` → `github/list_commits` to confirm the latest merge is deployed.
- **Browser Check**: Use `browser_subagent` to verify the feature renders correctly on staging.

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| The QA Wall | QA immediately kicks the ticket back to "In Progress" because the Staging environment returns a 500 Error | Do not argue. The Developer takes immediate ownership of Staging stabilization. Execute `roles/devops/incident-runbook/SKILL.md` against staging until the environment is restored. |

---

## ✅ Done Criteria / Verification

A feature is successfully handed over when:

- [ ] The code is physically running on the designated QA environment.
- [ ] A written summary including explicitly seeded Test Data is attached to the ticket.
- [ ] A formal ping/notification is sent to the assigned QA engineer.

---

## 📚 Cross-References

- `roles/dev/pr-checklist/SKILL.md` — PR must pass author checklist before reaching QA.
- `roles/dev/implementation-workflow/SKILL.md` — The coding phase that precedes this handover.
- `roles/dev/feature-flag-practice/SKILL.md` — Notify QA about active feature flags on staging.
