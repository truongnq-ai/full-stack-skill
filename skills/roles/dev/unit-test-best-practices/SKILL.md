---
name: Unit Test Best Practices
description: Guidelines for writing deterministic, fast, and resilient unit tests that actually catch bugs, rather than just chasing coverage percentages.
category: roles/dev
metadata:
  labels: [dev, unit-tests, tdd, jest, testing, quality]
  triggers:
    priority: high
    confidence: 0.95
    keywords: [unit test, write tests, jest, pytest, test coverage]
---

# 🧪 Unit Test Best Practices

> **Use this skill when**: you are writing code and must ensure its logic is mathematically sound, resilient to edge cases, and protected against future regressions by other developers. Trigger: `/dev-unit-test`.
>
> **Out of scope**: E2E or Integration Testing (e.g., Cypress clicking through a UI). Unit tests are isolated, nanosecond-fast execution bounds testing pure logic.

---

## 🚫 Anti-Patterns

- **Testing the Framework**: Writing a test to verify that `Array.push()` adds an item to an array, or that the React DOM mounts. (The Microsoft/Facebook engineers already tested that. Test YOUR business logic).
- **The 100% Coverage Lie**: Writing tests that execute functions to achieve 100% Line Coverage, but checking absolutely no `expect()` assertions. (The test passes even if the function returns the wrong math).
- **Hard-coded Fragility**: Testing `expect(timestamp).toBe('2025-01-01')`. The test passes today and fails tomorrow.

---

## 🛠 Prerequisites & Tooling

1. A fast test runner (Jest, Vitest, PyTest, JUnit).
2. Mocking libraries for intercepting IO operations.

---

## 🔄 Execution Workflow

### Step 1 — Arrange, Act, Assert (AAA Pattern)
Strictly structure every test block into three phases:
- **Arrange**: Set up the mock data, fake users, and dependencies.
- **Act**: Execute the single function you are testing.
- **Assert**: Verify the return value or state mutation is exactly correct.
*Never mix Act and Assert repeatedly in the same test block.*

### Step 2 — Isolate the Unit (Mocking)
A unit test must never touch the Internet, the Database, or the File System.
If `calculateTax()` calls a third-party Stripe API:
Mock/Stub the API. Force it to return a fake JSON payload. The Unit Test verifies *how your math handles that payload*, not whether Stripe is currently online.

### Step 3 — Test the Edges (BVA)
Do not just test the Happy Path (`calculateTax(100) -> 105`).
Test the evil boundaries (`test-case-design/boundary-value/SKILL.md`):
- What happens if the input is `0`?
- What happens if the input is `-500`?
- What happens if the input is `null`?

### Step 4 — Name the Test Semantically
Test names should read like English sentences explaining the Business Value.
- *Bad*: `test('calculate function')`
- *Good*: `it('should return a 5% tax rate when the user is located in Virginia')`

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| The Flaky Test | The test passes 90% of the time, but randomly fails in CI | The test is non-deterministic, usually relying on real Clock Time, random number generators, or asynchronous race conditions. You must implement Mock Clocks (e.g., `jest.useFakeTimers()`) to freeze time during the test. |

---

## ✅ Done Criteria / Verification

Unit tests are production-ready when:

- [ ] They execute completely offline with zero I/O or Database dependencies.
- [ ] They utilize the Arrange-Act-Assert structure.
- [ ] They verify edge cases (nulls, negatives, boundaries), not just the happy path.
