---
name: tdd
description: Enforces Test-Driven Development (Red-Green-Refactor cycle) for rigorous code quality. Activates when writing tests or implementing features with test files present.
metadata:
  labels: [testing, quality, tdd, productivity]
  triggers:
    files: ['**/*.spec.ts', '**/*.test.ts', '**/*_test.dart', '**/*_test.go', '**/*.test.py', '**/*.test.js']
    keywords: [test, spec, tdd, red-green-refactor, failing test, test first, unit test, write test]
    negative: ["user asks to debug existing bug without tests — use debugging skill", "user asks to configure test tooling — use tooling skill"]
---

# Test-Driven Development (TDD)

## **Priority: P1 (OPERATIONAL)**

**This skill does NOT**: configure test tooling (Jest/Vitest config) — use `typescript/tooling` or `javascript/tooling`. Does not debug failing tests without root cause — use `debugging` skill first.

**Compatible skills**: `quality-assurance` (coverage enforcement), `debugging` (fix failing test root cause), `code-review` (test quality review).

## The Iron Law

> **NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST.**
> Wrote code before the test? Delete it. Start over. No adapting. No keeping as reference.

## The TDD Cycle

1. **RED**: Write minimal failing test. `view_file` existing tests to understand patterns first.
   - Verify failure is expected (feature missing, not setup error).
2. **GREEN**: Write the simplest code to pass. Nothing more.
   - Verify test passes with `npm test` / `pytest` / `dart test`.
3. **REFACTOR**: Clean up while staying green. Run tests after every change.

> **Fallback**: If test runner fails to start, run `view_file package.json` (or equivalent) to verify test script config.

## Core Principles

- **Watch it Fail**: If you didn't see red, you didn't prove the test works.
- **Minimalism**: Don't add features beyond the current test. YAGNI applies strictly.
- **Real Over Mock**: Prefer real dependencies unless slow/flaky. See anti-patterns for mock overuse.

> Load anti-pattern guide: `view_file .agent/skills/common/tdd/references/testing_anti_patterns.md`

## 🚫 Anti-Patterns

**`No Production Code First`**: Write failing test before any implementation. No exceptions.

**`No Green Without Red`**: Never skip seeing the test fail. It proves the test is testing the right thing.

**`No Over-Mocking`**: Mock only slow/external dependencies. Over-mocking tests the mock, not the code.

**`No Big Bang Tests`**: Write one test at a time. One assertion per test where possible.

**`No Skipping Refactor`**: Green without clean code = technical debt. Refactor every cycle.

## ✅ Verification Checklist

- [ ] Every new function/method has a failing test written first
- [ ] Test failure message was expected (not setup error or typo)
- [ ] Minimal implementation written (no over-engineering)
- [ ] All tests green after refactor
- [ ] No skipped (`it.skip`, `xit`, `@pytest.mark.skip`) tests left uncommitted

## 📚 References

- [TDD Patterns & Discovery Protocols](references/tdd_patterns.md)
- [Testing Anti-Patterns](references/testing_anti_patterns.md)
