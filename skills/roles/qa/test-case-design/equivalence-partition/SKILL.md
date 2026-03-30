---
name: Equivalence Partitioning
description: Test Case Design technique to reduce infinite redundant testing by grouping inputs that the system treats identically into distinct partitions.
category: roles/qa
metadata:
  labels: [qa, test-design, equivalence, partitions, optimization]
  triggers:
    priority: medium
    confidence: 0.95
    keywords: [equiv partition, equivalence, test optimization, group inputs]
---

# 📦 Equivalence Partitioning (EP)

> **Use this skill when**: you need to minimize the number of test cases while maintaining 100% logic coverage, especially for dropdowns, status codes, and arbitrary string categories. Trigger: `/qa-design-ep`.
>
> **Out of scope**: This pairs with, but does not replace, Boundary Value Analysis. EP tests the "middle" of the bucket, BVA tests the "edges".

---

## 🚫 Anti-Patterns

- **Over-Testing Identical Logic**: If standard checkouts process Visa, Mastercard, and Amex using the exact same code block, writing three massive E2E tests for each card wastes CI time. (They are in the same partition).
- **Ignoring the Invalid**: Defining the valid partitions (e.g., Status = Open, Closed) but completely forgetting to write a test case for an Invalid partition (Status = NULL, or Status = Alien).

---

## 🛠 Prerequisites & Tooling

1. Knowledge of the internal business logic (e.g., via Developer communication) to confirm two inputs actually hit the *same code path*.
2. The requirements specification document.

---

## 🔄 Execution Workflow

### Step 1 — Identify the Input Variable
Extract the input parameter you are testing.
*Example*: Processing User Roles (Guest, Basic, Premium, Admin).

### Step 2 — Define the Valid Partitions
Group the inputs by how the system treats them.
If Guest and Basic users both get Ads, but Premium and Admin do not:
- **Partition 1 (Ad Supported)**: Guest, Basic
- **Partition 2 (Ad Free)**: Premium, Admin

### Step 3 — Define the Invalid Partitions
Always define what the system should explicitly reject.
- **Partition 3 (Invalid Data)**: `null`, unregistered enum values ("SuperUser"), Integers placed in string fields.

### Step 4 — Select One Representative Value
You do not need to test every item in a partition. Pick ONE value from each partition to represent the whole bucket.
- Representative 1: Test with a `Guest` account.
- Representative 2: Test with a `Premium` account.
- Representative 3: Test API with payload `Role: Alien`.

### Step 5 — Write the Test Cases
Document the selected values into formal `TC-XXX` tests in the tracker.
- `TC-401`: Login as Guest, Verify Ad Banner renders.
- `TC-402`: Login as Premium, Verify Ads do not render.
- `TC-403`: Force API call with Invalid Role, Verify `HTTP 400 Bad Request`.

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-------------|-----------------|
| Hidden Logic | You group inputs into one partition, but one fails randomly | Your partition assumption is wrong. The developer wrote a specific `if` statement for one of the values. Split the partition immediately into two separate buckets. |
| Overlapping Bounds | EP is used on Numbers (1-100) | Halt EP. Numerical boundaries require `/qa-design-bva` to catch off-by-one errors. Use EP for the middle `50`, but use BVA for `1` and `100`. |

---

## ✅ Done Criteria / Verification

An Equivalence Partitioning exercise is complete when:

- [ ] All possible inputs specified in the Acceptance Criteria are sorted into at least one Valid Partition.
- [ ] At least one Explicit Invalid Partition is defined and tested.
- [ ] Only ONE representative value per partition is converted into a formal test case (maximizing CI execution speed).
