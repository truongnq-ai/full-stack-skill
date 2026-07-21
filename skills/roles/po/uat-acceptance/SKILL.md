---
name: po-uat-acceptance
description: Product Owner conducts User Acceptance Testing (UAT) — validates delivered features against acceptance criteria, manages stakeholder sign-off, and gates the release decision.
category: roles
metadata:
  labels: [po, uat, acceptance, sign-off, release-gate, validation]
  triggers:
    priority: high
    confidence: 0.9
    keywords: [uat, user acceptance testing, accept feature, sign off, validate delivery, release gate]
    file_patterns: ["uat-report.md", "acceptance-criteria.md"]
    context: ["user asks to validate a delivered feature", "user asks to run UAT"]
    negative: ["user asks to write code", "user asks to write unit tests"]
---

# ✅ Product Owner — UAT Acceptance

> **Use this skill when**: PO needs to validate that delivered features meet the acceptance criteria defined in the PRD/stories, conduct stakeholder sign-off, and make a go/no-go release decision.
>
> **Out of scope**: Writing automated tests (use QA/Dev skills). Performance/load testing (use `tester/performance-testing`). Bug fixing (use Dev skills).

---

## **Priority: P0 (CRITICAL)**

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"] # or []
next_checks: ["<check 1>"]
```

---

## 🔄 Workflow

### Step 1 — Prepare UAT Test Plan
Before testing begins:
1. **Collect Acceptance Criteria**: Extract all Given/When/Then criteria from the stories in scope.
2. **Define Test Scenarios**: Map each acceptance criterion to a concrete test scenario.
3. **Identify Test Data**: Ensure test accounts, sample data, and environments are ready.
4. **Assign Testers**: Identify who will execute each scenario (PO, stakeholders, end users).

### Step 2 — Execute UAT Scenarios
For each test scenario:
1. **Execute**: Follow the test steps in the staging/UAT environment.
2. **Record Result**: Pass ✅ / Fail ❌ / Blocked 🚫
3. **Capture Evidence**: Screenshots, screen recordings, or log excerpts for failures.

```markdown
| ID | Scenario | Acceptance Criteria | Result | Evidence |
|----|----------|---------------------|--------|----------|
| UAT-01 | User login with valid creds | Given valid email/password, When submit, Then redirect to dashboard | ✅ Pass | — |
| UAT-02 | User login with invalid creds | Given invalid password, When submit, Then show error message | ❌ Fail | Screenshot: wrong error text |
```

> **⏸️ Checkpoint**:
> "UAT execution complete. [X] passed, [Y] failed, [Z] blocked. Review results before sign-off? (Y/N)"

### Step 3 — Defect Triage
For each failed scenario:
1. **Classify Severity**: Critical (blocks release) / Major (degraded UX) / Minor (cosmetic).
2. **Decision**: Fix before release? or Accept as known issue with workaround?
3. **Create Bug Tickets**: Link back to the original story and UAT scenario.

### Step 4 — Sign-Off Decision
Generate the UAT sign-off document:

```markdown
# ✅ UAT Sign-Off — [Feature Name]

## Summary
- Total Scenarios: [N]
- Passed: [X] | Failed: [Y] | Blocked: [Z]
- Pass Rate: [X/N × 100]%

## Decision: [GO / NO-GO / CONDITIONAL GO]

### Conditions (if Conditional Go)
- [ ] BUG-101 must be fixed before production deployment
- [ ] Known issue BUG-102 accepted with workaround documented

## Sign-Off
- PO: [Name] — [Date]
- Stakeholder: [Name] — [Date]
```

### Step 5 — Gate the Release
- **GO**: All acceptance criteria met. Approve deployment.
- **CONDITIONAL GO**: Minor issues accepted. Document known issues and workarounds.
- **NO-GO**: Critical failures. Block deployment. Return to Dev for fixes.

---

## 🚫 Anti-Patterns
- **Rubber-Stamp UAT**: Approving without actually executing the test scenarios. UAT must be a genuine validation.
- **Testing Implementation, Not Requirements**: Checking "does the code work?" instead of "does the feature meet the business need?"
- **No Failure Criteria**: Accepting all failures as "minor" to rush a release. Critical failures MUST block deployment.
- **Skipping Edge Cases**: Only testing the happy path. UAT must cover error states, boundary values, and permission scenarios.
- **Verbal Sign-Off**: Approving via Slack message instead of a documented, auditable sign-off artifact.

---

## 🛠️ Tools
- Jira, Zephyr (test case management and execution)
- BrowserStack, LambdaTest (cross-browser/device testing)
- Loom, screenshot tools (evidence capture)
- Notion, Confluence (sign-off document storage)
- `view_file`, `write_to_file` (for file-based UAT reports)

---

## ⚠️ Error Handling

| Issue | Cause | Fallback Action |
|-------|-------|-----------------|
| UAT environment unavailable | Infrastructure issue | Escalate to DevOps; document as "Blocked" and reschedule |
| Acceptance criteria missing | Story was not properly refined | Reconstruct from PRD and stakeholder interview; flag process gap |
| Stakeholder unavailable for sign-off | Schedule conflict | Use async sign-off with documented evidence and deadline |
| Test data not representative | Staging data stale or synthetic | Request data refresh or test with production-like data subset |

---

## ✅ Verification
- [ ] Every acceptance criterion from the stories is mapped to a UAT scenario.
- [ ] All scenarios are executed and results recorded (Pass/Fail/Blocked).
- [ ] Failed scenarios are triaged by severity.
- [ ] Sign-off document is generated with GO/NO-GO/CONDITIONAL GO decision.
- [ ] Critical failures block the release.
- [ ] Sign-off artifact is saved and committed.

---

## 📚 References
- [ISTQB — Acceptance Testing](https://glossary.istqb.org/en_US/term/acceptance-testing)
- [Atlassian — User Acceptance Testing](https://www.atlassian.com/agile/software-development/uat)
- [Ministry of Testing — UAT Guide](https://www.ministryoftesting.com/)
