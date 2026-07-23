---
name: Test Case Design (BVA, EP, Decision Tables)
description: Formal Test Case Design techniques (Boundary Value, Equivalence Partitioning, Decision Tables) to maximize coverage while minimizing execution time.
category: roles/tester
metadata:
  labels: [qa, test-design, boundary-value, equivalence, decision-table, tester]
  triggers:
    priority: high
    confidence: 0.95
    keywords: [test case design, edge cases, truth table, equiv partition, boundary testing, decision table]
    context: ["user asks to design test cases", "user asks for boundary values", "user asks to write tests for a feature"]
---

# 📐 Test Case Design Techniques

> **Use this skill when**: you need to design formal, structured test cases for a feature based on requirements. This skill combines the big three techniques: Boundary Value Analysis (BVA), Equivalence Partitioning (EP), and Decision Table Testing to ensure maximum coverage with the fewest redundant tests. Trigger: `/qa-design-tests`.
>
> **Out of scope**: This is for formal, structured test design. For unscripted, investigative testing, use `roles/tester/exploratory-testing/SKILL.md`.

---

## 🚫 Anti-Patterns

- **Random Number Selection**: Testing `3`, `44`, `78` for a 1-100 range, but forgetting exactly `1` and `100`.
- **Over-Testing Identical Logic**: Writing three massive E2E tests for Visa, Mastercard, and Amex when they use the exact same code block (ignoring partitions).
- **The Combinatorial Explosion**: Attempting to generate a truth table for 15 variables (32,768 cases) instead of isolating conditions.
- **Narrative Overload**: Writing 8 paragraphs describing test logic instead of using explicit Given/When/Then or tables.

---

## 🛠 Prerequisites & Tooling

1. A clear set of business rules from the User Story or PRD.
2. The Test Case repository or Test Management system (e.g., Zephyr/Jira).

**Required Tools**: Use `view_file` to read the requirement specs (`docs/specs/*.md`), and `write_to_file` to output the designed tests.

---

## 🔄 Execution Workflow

### Technique 1: Equivalence Partitioning (EP)
**Goal**: Minimize test cases by grouping inputs that the system treats identically.
1. **Identify Partitions**: Extract the input variable and group into Valid and Invalid buckets (e.g., Ad-supported roles vs Ad-free roles).
2. **Select Representatives**: Pick ONE value from each partition to represent the whole bucket (e.g., Guest for Ad-supported, null for Invalid).
3. **Write Cases**: Convert only the representatives into test cases.

### Technique 2: Boundary Value Analysis (BVA)
**Goal**: Focus on the absolute edges of numerical or length-based input ranges where logic errors most frequently occur.
1. **Identify Boundaries**: Extract the exact min/max limits from the spec (e.g., 18 to 65).
2. **Define the 3-Point Matrix**: For each boundary, test:
   - `Boundary - 1`
   - `Boundary`
   - `Boundary + 1`
3. **Implicit Bounds**: Add tests for technical edges (Empty, Null, 0, Negative, Max DB size limits).

### Technique 3: Decision Table Testing
**Goal**: Map complex, multi-variable boolean business rules to ensure 100% logical coverage.
1. **Extract Inputs/Outputs**: List independent boolean conditions and their resulting actions.
2. **Construct Truth Table**: Map out all combinations (e.g., 2 conditions = 4 rules).
3. **Prune**: Identify overlapping or impossible rules and remove redundant permutations.
4. **Write Cases**: Translate the pruned vertical rules into concrete `TC-XXX` cases.

> **⏸️ Checkpoint**: 
> "Các kịch bản kiểm thử (Test Cases) đã được thiết kế sử dụng các kỹ thuật BVA/EP/Decision Table. Bạn có muốn tôi ghi chúng vào file quản lý Test Case (hoặc đẩy lên Zephyr) không? (Y/N)"

---

## ⚠️ Error Handling (Fallback)

| Scenario | Encountered | Fallback Action |
|----------|-------------|-----------------|
| Too Many Vars | 5 Conditions = 32 Rules in Decision Table | Apply **Orthogonal Array Testing** or **Pairwise Testing** to reduce the matrix to core 2-way interactions. |
| Vague Spec | Requirement doesn't define limits | Stop writing cases. Invoke `/core-comm-contract` to ask the BA/PM to define strict conditions. |
| Float Ranges | Boundary is a decimal (e.g., min $1.50) | Apply the smallest sensible significant digit. Instead of `+1`, use `+0.01` (Test 1.49, 1.50, 1.51). |

---

## ✅ Done Criteria / Verification

Test Case Design is complete when:

- [ ] All inputs are sorted into Equivalence Partitions and representative tests are selected.
- [ ] Numerical and length-based inputs have explicit Boundary tests (Valid, Valid-1, Valid+1).
- [ ] Complex multi-variable rules are mapped and pruned via Decision Tables.
- [ ] Implicit technical boundaries (Empty, Null, Overflows) are accounted for.

---

## 📚 Cross-References

- **Test Plan Template**: `roles/tester/test-plan-template/SKILL.md` (What governs these test cases)
- **Execution Checklist**: `roles/tester/execution-checklist/SKILL.md` (How to actually run these cases)
