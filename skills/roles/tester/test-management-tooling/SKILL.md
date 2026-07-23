---
name: Test Management Tooling (Jira/Zephyr)
description: Workflow for generating or updating Zephyr Scale Test Cases from requirements and linking them back to Jira for traceability.
category: roles/tester
metadata:
  labels: [qa, zephyr, test-generation, jira, integration, traceability, tester]
  triggers:
    priority: medium
    confidence: 0.8
    keywords: [generate test cases, update zephyr, jira validation, jira issue, link zephyr, jira mcp]
    file_patterns: ["**/jira_*.xml", "**/test_case.json"]
    context: ["user asks to generate zephyr test cases", "user asks to link test cases to jira"]
---

# 🛠️ Test Management Tooling (Jira & Zephyr)

> **Use this skill when**: you need to interact with external test management systems (like Zephyr Scale or Jira) to pull requirement details, generate new test cases automatically, or establish traceability links. Trigger: `/qa-test-management`.
>
> **Out of scope**: This is NOT for test case *design theory* (use `roles/tester/test-case-design/SKILL.md`). This governs the *tooling execution* and JSON structure to push those designs into the SaaS platform.

---

## 🚫 Anti-Patterns

- **Ghost Updates**: Changing application code without updating the corresponding Zephyr TC to match the new flow.
- **No Ghosting (Traceability)**: Creating tests in Zephyr but failing to link them back to the original Jira Issue.
- **Duplicate Creation**: Creating a brand new TC for a minor logic shift when updating the existing TC was more appropriate.
- **Vague Steps**: Writing Zephyr steps like `System works` -> `Expect Result: Banner 'Success' is visible`. Steps must be atomic and reproducible.

---

## 🛠 Prerequisites & Tooling

1. Familiarity with the target Jira Issue structure and `roles/ba/id-registry/SKILL.md`.
2. Reference to the [Zephyr JSON Schema](references/zephyr_schema.json) for creation/updates.

**Required Tools**:
- **Jira MCP**: Use `call_mcp_tool` for `jira` (or standard `run_command` API calls) to fetch User Story details.
- **Zephyr MCP**: Use `call_mcp_tool` for `zephyr` (`create_test_case_issue_link`) to bridge the TC and Jira ticket.

---

## 🔄 Execution Workflow

### Step 1 — Retrieve Issue Details (Jira)
Fetch the Jira User Story details.
- **Core Info**: Retrieve Summary, Description, Acceptance Criteria, and Labels.
- **Sibling Analysis**: Identify other Jira issues with the same Component or Labels to find potentially impacted Zephyr TCs.
- **Platform/Market**: Detect if the requirement applies to `Web`, `Mobile`, or `Both`, and extract Market context.

### Step 2 — Impact Analysis
Search Zephyr for existing Test Cases related to this feature.
Perform an [Impact Study](references/impact_analysis.md) to decide:
- **Update**: If the feature logic changed slightly, fetch steps and apply deltas.
- **New**: If this is a net-new feature, create a new Zephyr TC.

### Step 3 — Draft/Merge TCs (Zephyr)
For **New** Test Cases, adhere to these metadata standards:
1. **Preconditions**: Must be extracted from the requirement as a list of bullet points.
2. **Custom Fields**: Populate `Roles` (multi-select) and `Platform` exactly as shown in requirements.
3. **Naming**: Prefix with `[Platform]` ONLY if exclusive to one platform (e.g., `[Web]_Checkout_Process`). Omit platform if it supports **Both**. Use the `[Module]_[Action]...` pattern.

### Step 4 — Establish Traceability (CRITICAL)
Immediately after creation or update:
1. Call `create_test_case_issue_link` (or equivalent API) to link the Zephyr TC key (e.g., `PROJ-T123`) to the Jira Issue (e.g., `EZRX-39448`).
2. Add a comment to Jira: `Linked Zephyr Test Case: {test_case_key}`.
3. Add `has-zephyr-tests` label to the Jira issue.

> **⏸️ Checkpoint**: 
> "Test Case đã được sinh ra trên Zephyr (ID: PROJ-T123). Bạn có muốn tôi tiến hành link Test Case này vào Jira Issue (EZRX-39448) để đảm bảo Traceability không? (Y/N)"

---

## ⚠️ Error Handling (Fallback)

| Scenario | Encountered | Fallback Action |
|----------|-------------|-----------------|
| Traceability Failure | MCP Link tool returns 404 | Verify the Jira issue ID and Zephyr TC ID are strictly alphanumeric (e.g., `PROJ-123`). If APIs fail, generate a Markdown mapping table and ask a human to manual link them. |
| Duplicate TC | You attempt to create a TC but an identical name exists | Do not create a duplicate. Fetch the existing TC by ID, run an Impact Analysis, and UPDATE the existing TC instead. |

---

## ✅ Done Criteria / Verification

Test Management execution is complete when:

- [ ] Requirements (AC, Platform, Preconditions) are fully translated into atomic Test Case steps.
- [ ] Zephyr Test Cases conform perfectly to the JSON schema (no vague steps or "OR" logic).
- [ ] Every modified/created Zephyr Test Case is permanently linked to its parent Jira Issue.
- [ ] Jira is updated with the correct labels and comments indicating test coverage exists.

---

## 📚 Cross-References

- **Test Case Design**: `roles/tester/test-case-design/SKILL.md` (For the theory behind writing good steps)
- **Coverage Traceability**: `roles/tester/coverage-traceability/SKILL.md` (To verify the linking worked globally)
