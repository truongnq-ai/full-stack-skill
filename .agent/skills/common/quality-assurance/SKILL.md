---
name: Quality Assurance Standards
description: Standards for maintaining code hygiene, automated checks, and testing integrity. Activates when writing tests, configuring CI, or enforcing code quality gates.
metadata:
  labels: [quality-assurance, testing, linting, code-quality, ci]
  triggers:
    files: ['**/*.spec.ts', '**/*.test.ts', '**/*.test.js', '**/*.spec.js', '.eslintrc.*', 'jest.config.*', '.github/workflows/**']
    keywords: [test, qa, lint, quality, assurance, coverage, ci, pipeline, hook, pre-commit, sonar]
    negative: ["user asks to debug a specific bug — use debugging skill", "user asks to design architecture — use system-design"]
---

# Quality Assurance Standards

## **Priority: P1 (MAINTENANCE)**

**This skill does NOT**: debug specific bugs — use `debugging` skill. Does not cover architecture design — use `system-design`. Unit test patterns (TDD cycle) belong to `tdd` skill.

**Compatible skills**: `tdd` (test-first cycle), `debugging` (bug fix validation), `code-review` (QA enforcement in PRs), `testing-rule` (applied automatically).

## 🔍 Code Quality & Linting

- **Zero Tolerance**: All linter warnings/errors are fatal in CI. No exceptions.
- **Automated Formatting**: Enforce `prettier`/`gofmt`/`black` on every commit via hooks.
- **Type Safety**: Never use `any` / `dynamic`. Use specific interfaces for all data boundaries.
- **Dead Code**: Remove unused imports, variables, and deprecated methods proactively.

> To enforce: `view_file .agent/skills/common/quality-assurance/` for pre-commit hook configs.

## 🧪 Testing Standards

- **FIRST**: Tests must be Fast, Independent, Repeatable, Self-validating, Timely.
- **Test Pyramid**: 70% unit / 20% integration / 10% E2E.
- **Edge Cases**: Always test null/empty, boundary limits, and error conditions.
- **Mock External**: Isolate by mocking APIs, DBs, file system for determinism.

> **Fallback**: If test runner unavailable, use manual verification checklist and document results.

## 🎯 Risk-Based Testing Priority

1. Auth flows, payments, data mutation — highest coverage required.
2. Error paths and boundary conditions.
3. Happy path (usually already covered by feature development).

> Apply: "What happens if this fails?" If answer is "Data Loss" or "User can't log in" → 100% coverage required.

## 🛠 Automation & CI

- **Pre-commit hooks**: Run lint + format + unit tests before every push (husky/lefthook).
- **CI gate**: PR must pass lint + test + build before merge. No manual override.
- **Coverage threshold**: Minimum defined in `jest.config.*` or `coverage.json`. Never reduce threshold.

## 🚫 Anti-Patterns

**`No Ignored Warnings`**: Linter warnings left in code lead to codebase rot. Fix or suppress with documented reason.

**`No Implementation Testing`**: Test behavior, not private method internals. Refactoring must not break tests.

**`No Test-Last`**: Testing after feature completion misses design feedback. Test during or before writing code.

**`No Magic Test IDs`**: Use descriptive constants for test selectors. Not `#input-1`.

**`No Coverage Gaming`**: Coverage % without meaningful assertions is worthless. Test behavior, not line hits.

## ✅ Verification Checklist

- [ ] All new code has corresponding test file
- [ ] Coverage threshold passes (`npm test -- --coverage`)
- [ ] Pre-commit hook runs lint + test locally
- [ ] CI pipeline passes all checks on PR
- [ ] Edge cases (null, boundary, error) tested

## 📚 References

- [TDD Cycle](../tdd/SKILL.md)
- [TDD Feedback Examples](references/TDD_FEEDBACK.md)
