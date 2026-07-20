---
name: Boundary Value Analysis
description: Test Case Design technique focusing on the absolute edges of input ranges where logic errors most frequently occur.
category: roles/qa
metadata:
  labels: [qa, test-design, boundary-value, bva, test-cases]
  triggers:
    priority: medium
    confidence: 0.9
    keywords: [boundary testing, bva, test case design, edge cases]
---

# 📏 Boundary Value Analysis (BVA)

> **Use this skill when**: designing test cases for any feature that accepts numerical inputs, date ranges, character limits, or financial thresholds. Trigger: `/qa-design-bva`.
>
> **Out of scope**: This does not apply well to boolean logic (True/False) or unordered sets (e.g., choosing "Red" or "Blue"). Use Equivalence Partitioning for those.

---

## 🚫 Anti-Patterns

- **Random Number Selection**: If the valid range is 1 to 100, testing `3`, `44`, `78`, and `89` but forgetting to test exactly `1` and `100`.
- **Ignoring the Negative**: Testing the valid range but forgetting to test the immediate invalid boundaries (e.g., `0` and `101`).
- **Data Type Limits**: Forgetting implicit system boundaries (e.g., Integer Max Value `2147483647` or database `VARCHAR(255)`).

---

## 🛠 Prerequisites & Tooling

1. The exact constraints defined in the Business Requirement (e.g., "Password must be 8-20 characters").
2. Your test tracking repository (`docs/qa/test-cases/`).

---

## 🔄 Execution Workflow

### Step 1 — Identify the Domain Boundaries
Extract the exact rules from the spec.
*Requirement*: "Age must be between 18 and 65 inclusive."

### Step 2 — Define the 3-Point Boundary Matrix
For every single minimum and maximum threshold, define the 3 absolute edge cases:
- `Boundary - 1` (Just below the limit)
- `Boundary` (Exactly on the limit)
- `Boundary + 1` (Just above the limit)

*Matrix for Age (18 to 65)*:
- Lower Boundary (18): `17` (Invalid), `18` (Valid), `19` (Valid)
- Upper Boundary (65): `64` (Valid), `65` (Valid), `66` (Invalid)

### Step 3 — Generate Concrete Test Cases
Translate the matrix into explicit `TC-XXX` documents.
- `TC-101`: User inputs Age 17 -> Assert Validation Error "Too young".
- `TC-102`: User inputs Age 18 -> Assert Success.
- `TC-103`: User inputs Age 65 -> Assert Success.
- `TC-104`: User inputs Age 66 -> Assert Validation Error "Too old".

### Step 4 — Handle Implicit Boundaries
Add tests for technical edges that the BA might not have written:
- `0` or Negative numbers (`-1`).
- Empty string or Null (`""`).
- Max DB size limits (e.g., posting a 10MB file when the limit is 5MB).

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| Float Ranges | Boundary is a decimal (e.g., min $1.50) | Apply the smallest sensible significant digit. Instead of `+1`, use `+0.01`. (Test 1.49, 1.50, 1.51). |
| Vague Spec | BA specified "Maximum width is 100" but didn't say if 100 is allowed | Stop writing Test cases. Invoke `/core-comm-contract` and throw the requirement back to the BA to define "inclusive" vs "exclusive". |

---

## ✅ Done Criteria / Verification

A Boundary Value suite is verified when:

- [ ] Every numerical or length-based input evaluates strictly Valid, Valid-1, and Valid+1 conditions.
- [ ] At least two tests actively aim to trigger a Validation Error at the immediate bounds.
- [ ] Implicit technical boundaries (Empty, Null, Buffer Overflow sizes) are addressed.
