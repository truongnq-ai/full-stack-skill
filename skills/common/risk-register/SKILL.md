---
name: Risk Register Management
description: Maintains project risk register — identifies, scores, and tracks mitigation strategies for technical and operational risks.
category: common
metadata:
  labels: [project-management, risks, register, technical-debt]
  triggers:
    priority: high
    confidence: 0.9
    keywords: [risk, technical debt, blocker, mitigation, register]
---

# 🛡️ Risk Register Management

> **Use this skill when**: the agent detects a systemic architectural issue, significant creeping technical debt, scope creep, or a project blocker that should be tracked formally across iterations. Trigger: `/core-manage-risk`.
>
> **Out of scope**: Does NOT execute the actual code mitigation immediately. Does NOT handle immediate SEV-1 production incidents (use `skills/roles/devops/incident-runbook/SKILL.md` instead).

---

## 🚫 Anti-Patterns

- **Vague Tracking**: Logging vague risks like "Server might go down" without specific business impact, probability matrix, or concrete triggers.
- **Orphan Risks**: Creating a risk entry without assigning an owner or a next verification date.
- **Scattered Truth**: Storing risks in scattered documents, Slack threads, or isolated PR comments instead of the centralized Risk Register.
- **Ignoring Debt**: Dismissing massive technical debt (e.g. monolithic spaghetti code) as "just bad code" rather than logging it as an active operational Risk.

---

## 🛠 Prerequisites & Tooling

1. A centralized register markdown file must exist at: `docs/management/risk-register.md`.
2. Load references to understand standard agile risk categorization:
```bash
view_file skills/common/risk-register/references/examples.md
```

If the register file does not exist, initialize it:
```bash
mkdir -p docs/management
echo "# Project Risk Register" > docs/management/risk-register.md
echo "| ID | Date Logged | Category | Risk Description | Prob | Impact | Score | Strategy | Owner | Status |" >> docs/management/risk-register.md
echo "|---|---|---|---|---|---|---|---|---|---|" >> docs/management/risk-register.md
```

---

## 🔄 Execution Workflow

### Step 1 — Identify & Classify
When a risk is detected during code review or architecture planning, classify it based on two factors:
- **Probability** (Low = 1, Med = 2, High = 3)
- **Impact** (Low = 1, Med = 2, High = 3)

Calculate the **Risk Score** = Probability × Impact (1-9 scale).
*High Risk*: Score 6-9 (Requires immediate mitigation plan)
*Medium Risk*: Score 3-5 (Requires monitoring)
*Low Risk*: Score 1-2 (Acceptable)

### Step 2 — Define Mitigation Strategy
Determine the project's stance on this specific risk:
- **Avoid**: Change the architectural plan entirely to eliminate the risk vector.
- **Mitigate**: Take specific developer/devops action to reduce probability or impact.
- **Accept**: Acknowledge the risk, but take no active action due to resource constraints.
- **Transfer**: Move the risk to a third-party service (e.g., using SaaS Auth instead of custom).

### Step 3 — Update Register Table
Append or update the row in `docs/management/risk-register.md` using strict markdown table syntax. Ensure escaping of any internal pipe `|` characters.

```markdown
| R-001 | 2026-03-30 | Security | Plaintext secrets in legacy repo | 3 | 3 | **9** | Mitigate: Move to Vault | DevOps | Open |
```

### Step 4 — Notification & Alerting
If Score ≥ 6, actively notify the team or PM:
- Mention `@PM` explicitly in the chat context or Task list.
- Use `skills/common/telegram-interactive-messages/SKILL.md` to send an urgent notification to stakeholders.

---

## ⚠️ Error Handling (Fallback)

| Issue | Detection | Fallback Action |
|-------|-----------|-----------------|
| Markdown table broken | Misaligned pipes (`|`) or missing columns | Run a markdown formatter snippet or rewrite the exact row safely using text tools, avoiding multi-line descriptions inside table cells. |
| Duplicate Risk ID | `grep R-NNN risk-register.md` returns multiple hits | Parse the last ID, auto-increment the risk ID sequence before appending the new entry. |
| File locked/Conflict | Git merge conflict on the register file | Pull remote file, resolve text manually favoring the highest scores, then commit. |

---

## ✅ Done Criteria / Verification

Verify the following before declaring the risk managed:

- [ ] New risk entry is correctly and cleanly formatted in the standard markdown table.
- [ ] Probability, Impact, and Final Score are explicitly calculated and recorded.
- [ ] Mitigation strategy chosen (Avoid, Mitigate, Accept, Transfer) and owner designated.
- [ ] High-priority risks (Score ≥ 6) prominently surfaced to stakeholders.
