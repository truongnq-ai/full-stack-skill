---
name: UAT Process Guidelines
description: Orchestrates the User Acceptance Testing phase, translating deep technical workflows into business-friendly, scenario-based validations for pure non-technical Stakeholders.
category: roles/qa
metadata:
  labels: [qa, uat, user-acceptance, stakeholder-signoff, post-qa]
  triggers:
    priority: medium
    confidence: 0.9
    keywords: [uat, user acceptance test, client testing, stakeholder approval]
---

# 🧑‍💼 UAT Process Guidelines (User Acceptance)

> **Use this skill when**: internal QA finishes testing, and the product must be definitively accepted by the Client, Product Owner, or Business Sponsor before going live. Trigger: `/qa-run-uat`.
>
> **Out of scope**: This does NOT use the highly technical QA `Test Case` formats. UAT relies on simplified `Business Scenario` formats.

---

## 🚫 Anti-Patterns

- **Handing QA Sheets to Clients**: Giving a client a 400-row Excel sheet of "boundary value edge cases" instead of 5 Core Business Journeys.
- **Testing on Production**: Letting external clients test "Make a Purchase" logic using their real credit cards in the live Production DB.
- **Unmoderated UAT**: Throwing a Staging link at a client and saying "let me know if it works" with zero guidance.

---

## 🛠 Prerequisites & Tooling

1. A locked Staging Environment populated with safe, mocked UAT Demo Data (`test-data-management/SKILL.md`).
2. The initial PRD (Product Requirement Document) or Business Brief.
3. Formally executed `roles/qa/qa-gates/SKILL.md` (QA MUST be green before UAT starts).

---

## 🔄 Execution Workflow

### Step 1 — Verify the QA Sign-Off Gate
Do not commence UAT if there are open S1/S2 bugs from the internal QA team. UAT is for *Business Validation*, not uncovering `NullPointerExceptions`.

### Step 2 — Translate Tech to Scenarios
Take the deep QA Test Plan and abstract it into a "UAT Playbook".
Format it strictly by Persona.

*Example*:
**Scenario 1: New Employee Onboarding**
- **Goal:** Prove HR can invite a new staff member and the staff member can access the portal.
- **Login as:** `hr_demo@example.com` / `password123`.
- **Instruction 1:** Click 'Invite User', enter an email.
- **Instruction 2:** Open our Mailtrap staging sandbox, click the link.
- **Instruction 3:** Set password.
- **Does it work?** [ ] Yes [ ] No (If No, what happened?)

### Step 3 — Guide & Orchestrate
Create the official `UAT-Playbook-[Version].md`.
If the agent is orchestrating, it should output these instructions directly to the PO/Stakeholder in a chat interface or distribute the markdown.

### Step 4 — Triage UAT Feedback
Clients will often log "Bugs" during UAT that are actually "Feature Requests" (New scope).
Triage strictly:
- **Defect**: "I clicked invite and got a 500 error." -> Escalate to Dev as an urgent `BUG-XXX`.
- **Change Request**: "I wish the invite button was blue instead of red." -> Send to BA/PM to create a new User Story for the next sprint. Do NOT block the UAT Signoff for this.

### Step 5 — Formal Stakeholder Sign-Off
Obtain the literal written approval from the Sponsor ("Approved to deploy"). Log this into the Release Readiness certificate.

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| Complete Rejection| The Client says "This isn't what I asked for" even though there are 0 bugs. | Halt UAT. Trigger an emergency Gap Analysis (BA). The fundamental assumption of the architecture was wrong. |
| Flaky Data | Client logs in to `hr_demo` but someone changed the data | Invoke `roles/qa/environment-management/SKILL.md` to cleanly wipe and reseed the DB specifically for the UAT session. |

---

## ✅ Done Criteria / Verification

UAT Phase is closed when:

- [ ] The UAT Playbook abstracts tech constraints into Business Scenarios cleanly.
- [ ] At least one designated stakeholder completes the Playbook.
- [ ] All resulting feedback is strictly triaged into `Defect` vs `Change Request`.
- [ ] Explicit final approval is documented in the tracker.
