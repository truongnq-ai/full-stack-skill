---
name: tdd
description: Enforces Test-Driven Development (Red-Green-Refactor) for rigorous code quality.
metadata:
  labels:
    - tdd
    - testing
    - quality
    - common
  triggers:
    priority: medium
    confidence: 0.7
    keywords:
      - tdd
      - test-driven
      - red green refactor
      - test first
workflow_ref: battle-test
---

# Test-Driven Development (TDD)

## **Priority: P1 (OPERATIONAL)**

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

## **The Iron Law**

> **NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST.**
> If you wrote code before the test: **Delete it.** Start over. No "adapting" or keeping as reference.

## **The TDD Cycle**

1. **RED**: Write a minimal failing test. **Verify failure** (Expected error, not typo).
2. **GREEN**: Write the simplest code to pass. **Verify pass** (Pristine output).
3. **REFACTOR**: Clean up code while staying green.

## **Core Principles**

- **Watch it Fail**: If you didn't see it fail, you didn't prove the test works.
- **Minimalism**: Don't add features/options beyond the current test (YAGNI).
- **Real Over Mock**: Prefer real dependencies unless they are slow/flaky. Avoid [Anti-Patterns](references/testing_anti_patterns.md).

## **Verification Checklist**

- [ ] Every new function/method has a failing test first?
- [ ] Failure message was expected (feature missing, not setup error)?
- [ ] Minimal code implemented (no over-engineering)?
- [ ] [Common Pitfalls](references/testing_anti_patterns.md) avoided?

## **Expert References**

- [TDD Patterns & Discovery Protocols](references/tdd_patterns.md)
- [Testing Anti-Patterns (Safety First)](references/testing_anti_patterns.md)
- [Examples (Input/Output)](references/examples.md)
