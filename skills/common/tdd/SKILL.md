---
name: tdd
description: Enforces Test-Driven Development (Red-Green-Refactor cycle). Use when implementing any feature or bugfix, before writing implementation code.
triggers: test, spec, tdd, red-green-refactor, failing test, first, feature, bugfix
priority: P1
---

# Test-Driven Development (TDD)

> **Goal**: Enforce the Red-Green-Refactor cycle for rigorous code quality and prevent rationalizations for skipping tests.

## The Iron Law

**NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST.**
If you write code before the test, delete it. Start over. No adapting. No keeping as reference.

## The TDD Cycle

1. **RED**: Write a minimal failing test. 
   - *Verify* the failure is expected (the feature is missing, not a setup error or typo).
2. **GREEN**: Write the simplest code to pass. Nothing more.
   - *Verify* the test passes.
3. **REFACTOR**: Clean up while staying green. Run tests after every change.

*(See `references/tdd-detailed-guide.md` for common rationalizations and why order matters).*

## Anti-Patterns

- **No production code first**: Do write the failing test before any implementation. No exceptions.
- **No green without red**: Do NOT skip seeing the test fail. Ensure it fails for the right reason.
- **No over-mocking**: Do mock only slow/external dependencies. Real > Mock.
- **No big bang tests**: Do write one test at a time.
- **No skipping refactor**: Do refactor every cycle to prevent technical debt.

## Tools
- `run_command` with your test runner (`npm test`, `pytest`, `cargo test`, `go test`).

## Verification

- [ ] Every new function/method has a failing test written *first*.
- [ ] I watched the test fail and confirmed the failure message was expected.
- [ ] I wrote minimal implementation to pass without over-engineering.
- [ ] All tests are green after refactoring.
- [ ] No disabled tests (`it.skip`) were left uncommitted.
