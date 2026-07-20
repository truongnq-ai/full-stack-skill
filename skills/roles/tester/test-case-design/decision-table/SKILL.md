---
name: Decision Table Testing
description: Test Case Design technique mapping complex, multi-variable business rules into a truth table to ensure 100% logical coverage.
category: roles/qa
metadata:
  labels: [qa, test-design, decision-table, truth-table, matrix]
  triggers:
    priority: medium
    confidence: 0.9
    keywords: [decision table, truth table, matrix testing, multi-variable]
---

# 🧮 Decision Table Testing

> **Use this skill when**: designing tests for features governed by complex combinations of boolean rules, conditional approvals, or interlocking permissions (e.g., "If User is Pro AND Has Coupon BUT Coupon is Expired -> Disallow"). Trigger: `/qa-design-decision-table`.
>
> **Out of scope**: Not required for simple linear forms. Use only when independent conditions overlap to form a final output.

---

## 🚫 Anti-Patterns

- **The Combinatorial Explosion**: Attempting to generate a truth table for 15 variables (2^15 = 32,768 test cases). This is impossible to execute.
- **Testing the Impossible**: Creating a test case where "User is Logged Out = TRUE" AND "User is Admin = TRUE" if the system fundamentally prevents this state.
- **Narrative Overload**: Writing 8 paragraphs describing rule logic instead of using a simple, readable Markdown Table.

---

## 🛠 Prerequisites & Tooling

1. A clear set of business rules from the User Story.
2. A markdown document to hold the Decision Table matrix.

---

## 🔄 Execution Workflow

### Step 1 — Extract the Conditions (Inputs)
Read the spec and list the independent boolean inputs.
Example Scenario: *Free Shipping Eligibility*.
- Condition 1: `Cart > $50`
- Condition 2: `User is VIP`

### Step 2 — Extract the Actions (Outputs)
Identify what happens based on the inputs.
- Action 1: `Grant Free Shipping`
- Action 2: `Show Upsell Message`

### Step 3 — Construct the Truth Table
Map out all combinations (2^N, where N = number of conditions).
For 2 conditions, we have 4 rules.

| Conditions | Rule 1 | Rule 2 | Rule 3 | Rule 4 |
|------------|--------|--------|--------|--------|
| Cart > $50 | T      | T      | F      | F      |
| VIP User   | T      | F      | T      | F      |
| **Actions**|        |        |        |        |
| Free Ship  | TRUE   | TRUE   | TRUE   | FALSE  |
| Upsell Msg | FALSE  | FALSE  | FALSE  | TRUE   |

### Step 4 — Pruning (Optimization)
Identify overlapping or impossible rules.
If being a VIP *always* grants Free Shipping regardless of cart size, then Rule 1 and Rule 3 do not need to be rigorously separate E2E UI tests (one is sufficient for the VIP rule, saving automation time).

### Step 5 — Generate Tangible Test Cases
Translate the vertical Rules into specific `TC-XXX` artifacts.
- `TC-301` (Rule 2): Checkout with $51 cart as Standard User -> Verify Free Shipping true.
- `TC-302` (Rule 4): Checkout with $20 cart as Standard User -> Verify shipping charged & Upsell shown.

---

## ⚠️ Error Handling (Fallback)

| Scenario | Encountered | Fallback Action |
|----------|-------------|-----------------|
| Too Many Vars | 5 Conditions = 32 Rules | Apply **Orthogonal Array Testing** or **Pairwise Testing** to reduce the matrix to just the core 2-way interactions, discarding pure 5-way permutations. |
| Vague Spec | BA says "Usually VIPs get free shipping but sometimes not" | Halt. Reject doc. Generate an active question to the BA demanding strict True/False conditions. |

---

## ✅ Done Criteria / Verification

A Decision Table is formally complete when:

- [ ] All Conditions (Inputs) and Actions (Outputs) are clearly separated in the markdown table.
- [ ] Every intersection of the matrix results in a deterministic (not random) outcome.
- [ ] The pruned vertical Rules are successfully translated into executable QA test cases.
