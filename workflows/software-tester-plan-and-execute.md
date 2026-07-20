---
description: Tester creates test plans, executes UI/API tests, and reports bugs based on BA requirements.
---

# 🧪 Tester Plan & Execute

> **Use this workflow when**: Features have been implemented by DEV and are ready for QA/Testing. Trigger: `/software-tester-plan-and-execute`.
>
> **Out of scope**: Does not fix bugs — use `software-dev-fix-bug`.
>
> **Activates skills**: `skills/roles/tester/test-planning/SKILL.md`, `skills/roles/tester/api-testing/SKILL.md`, `skills/roles/tester/manual-testing/SKILL.md`

---

## Step 1 — Review Requirements & Handover

Review the requirements and release notes:

```bash
view_file docs/specs/requirements-[feature_name].md
```

Identify the scope of testing required (e.g., API only, UI, Performance, Security).

---

## Step 2 — Test Planning & Case Generation

Create a comprehensive Test Plan mapping to the Acceptance Criteria and Edge Cases defined by the BA.

Save to `docs/qa/test-plan-[feature_name].md`:
- **Scope**: What is being tested.
- **API Tests**: Endpoints, payloads, expected status codes.
- **UI/Manual Tests**: Step-by-step user flows, expected visual states.
- **Test Data**: Required setup data.

---

## Step 3 — Test Execution

Execute the test cases defined in the plan.
- For **API Testing**: Use curl, Postman, or automated API testing tools.
- For **UI Testing**: Perform manual exploratory testing or run automation scripts (e.g., Cypress/Selenium).

Record the result (Pass/Fail) for each test case in the Test Plan document.

---

## Step 4 — Bug Reporting

For any failed test cases, generate a standardized bug report.

Save to `docs/qa/bugs/bug-[id]-[short_desc].md`:
```markdown
## Bug: [Short Description]
- **Severity**: Blocker / Major / Minor / Nit
- **Environment**: [Staging / Prod / Local]
- **Steps to Reproduce**: 1, 2, 3
- **Expected Behavior**: ...
- **Actual Behavior**: ...
- **Logs / Screenshots**: ...
```

Notify the DEV team for triage.

---

## Done Criteria

- [ ] `docs/qa/test-plan-[feature_name].md` created and execution results recorded
- [ ] All required API and UI tests have been executed
- [ ] Bugs have been logged and assigned to DEV
