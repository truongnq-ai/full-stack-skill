---
name: Quality Assurance
description: Standards for creating high-quality, granular manual test cases and QA processes.
metadata:
  labels: [qa, testing, best-practices]
  triggers:
    priority: medium
    confidence: 0.7
    files: ['**/*.feature', '**/*.test.ts', '**/test_plan.md']
    keywords:
      [
        test case,
        qa,
        bug report,
        testing standard,
        zephyr,
        jira ticket,
        acceptance criteria,
        test scenario,
        manual test,
      ]
    exclude: ['src/**/*.ts', 'src/**/*.js', 'src/**/*.tsx', 'src/**/*.jsx']
workflow_ref: battle-test
---

# Quality Assurance Standards

## **Priority: P1 (HIGH)**

## Output Template

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"] # or []
next_checks: ["<check 1>"]
```

- **Summary**: <what changed / what was done>
- **Risks**: <known risks or "none">
- **Next Checks**: <tests/verification steps>

## 1. Test Case Granularity

- **1 Test Case = 1 Condition on 1 Screen**.
  - **Split Screens**: "Order Details" & "Item Details" are separate.
  - **Split Conditions**: "Config A" & "Config B" are separate.
- **No "OR" Logic**: Each TC must test a single, distinct path.

## 2. Naming Convention

- **Pattern**: `([Platform]) [Module]_[Action] on [Screen] when [Condition]`
- **Rule**: Only include `[Platform]` if requirement is exclusive to one platform (e.g., `[Mobile]`). Omit if it supports **Both**.
- **Example**: `Order_Verify payment term on Item Details when Toggle is OFF` (Supports Both)

## 3. Priority Levels

- **High**: Critical path, blocker bug.
- **Normal**: Standard validation, edge case.
- **Low**: Cosmetic, minor improvement.

## 4. References

- [Detailed Examples](references/test_case_standards.md)
- [Examples (Input/Output)](references/examples.md)
