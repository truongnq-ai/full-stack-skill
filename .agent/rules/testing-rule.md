---
description: Prevent agent from skipping tests when modifying business logic. Enforces test-first awareness and verification before completing any logic change.
globs: ["src/**/*", "lib/**/*", "app/**/*", "packages/**/*"]
alwaysApply: false
---

# 🧪 Testing Rule

**Priority**: MEDIUM — applies to all source code modifications involving logic changes.
**Activation**: Auto-triggered by `globs` match on source files. Also applies when user says "fix this bug" or "change this behavior".
**Conflict resolution**: Subordinate to `file-safety-rule` and `code-generation-rule`. Apply after code changes are written.
**Risk addressed**: Agent modifies business logic without running or updating tests — creating silent regressions that only surface in production.

---

## Core Rules

**No logic change without test check**: Before completing ANY modification to business logic, query: _"Does a test file exist for this module?"_
```bash
find . -name "*.spec.ts" -o -name "*.test.ts" -o -name "*_test.go" | grep -i <module-name>
```

**No skipping test runs**: After modifying logic, ALWAYS run the relevant tests:
```bash
# Node.js / TypeScript
pnpm test -- --testPathPattern=<filename>

# Go
go test ./... -run <TestName>

# Flutter
flutter test test/<filename>_test.dart

# Generic fallback
npm test 2>/dev/null || pnpm test 2>/dev/null || yarn test 2>/dev/null
```
> **Fallback**: If no test runner found, notify user: _"No test runner detected. Please confirm tests pass manually before merging."_

**No untested new logic (P0 functions)**: For every new `export`ed function or public method added, a corresponding test case MUST be created or explicitly deferred with user approval.

**No silent test failure**: If tests fail after a change, STOP immediately. Do NOT continue to other tasks or commit. Fix the failing tests first.

**Test update mandatory**: If existing tests break because of an intentional behavior change, UPDATE the tests to reflect the new expected behavior — do not just delete the failing test.

---

## Test Existence Classification

| Change Type | Test Requirement |
|-------------|-----------------|
| Bug fix | Run existing tests. Add regression test for the bug. |
| New feature | Add unit test for happy path + at least 1 edge case. |
| Refactor | Run existing tests — they must all pass with zero changes. |
| Config/env change | Run integration tests if available. |
| UI-only change | Visual check acceptable, no unit test required. |

---

## Scope Exceptions

Rule does NOT apply when: (1) change is in `*.md`, config files, or purely cosmetic styling, (2) user explicitly says `"skip tests for now"` (agent must add `// TODO: add tests` comment), (3) project has no test framework at all (agent must notify user).

---

## Enforceability

After each logic change, confirm:
- [ ] Searched for existing test file for the modified module
- [ ] Test suite ran and passed (or user acknowledged failure)
- [ ] New exports have at least 1 corresponding test case
- [ ] No tests were silently deleted to make the suite pass

**Pass**: `pnpm test` exits with code 0.
**Fail**: Tests fail or were deleted → block commit until resolved.
