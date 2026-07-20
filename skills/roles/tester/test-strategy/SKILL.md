---
name: Overarching Test Strategy (The Pyramid)
description: The baseline architecture of the project's testing methodology, outlining the balance of Unit, Integration, and E2E testing to maximize coverage and minimize CI time.
category: roles/qa
metadata:
  labels: [qa, strategy, test-pyramid, architecture]
  triggers:
    priority: high
    confidence: 0.95
    keywords: [test strategy, the pyramid, testing architecture, how we test]
---

# 🧗 Overarching Test Strategy

> **Use this skill when**: onboarding new QA automation engineers or defending the QA architecture to technical stakeholders. Trigger: `/qa-define-strategy`.
>
> **Out of scope**: This is NOT for planning a single sprint release (use `test-plan-template/SKILL.md`). This is the Macro view.

---

## 🚫 Anti-Patterns

- **The Ice Cream Cone**: Having 100 Unit tests, 500 Integration tests, and 2,000 brittle UI E2E tests. (This creates a massive maintenance nightmare and 6-hour CI pipelines).
- **E2E for Everything**: Trying to test that an internal math function `(2+2=4)` returns correctly by writing a 45-second Playwright script that logs into the UI.
- **Ignoring API Layer**: Writing UI tests without writing Postman/Supertest API tests right below them.

---

## 🛠 Prerequisites & Tooling

1. Complete understanding of Martin Fowler's "Test Pyramid".
2. Ability to review the current CI/CD script (e.g., looking at `npm test` vs `npm run cypress`).

---

## 🔄 Execution Workflow

### Step 1 — Audit the Current Distribution
Verify the current testing repository using code-search (`list_dir`, `grep_search`).
Count roughly how many files exist under:
1. `src/**/*.spec.ts` (Unit/Component level)
2. `tests/api/**/*.js` (Integration Level)
3. `tests/e2e/**/*.js` (UI E2E level)

### Step 2 — Enforce the Theoretical Pyramid
If the ratio violates the Pyramid (Unit > Integration > E2E), document a roadmap to fix it.
**Standard Ratios**:
- **70% Unit / Component**: Fast, isolated, mocks network. Covers all branches/edge cases.
- **20% Integration / API**: Slower, tests DB contracts, validates that service A can talk to Service B.
- **10% E2E UI**: Slow, expensive. Only tests the "Happy Path" Critical Business User Journeys.

### Step 3 — Define Test Ownership
Explicitly outline who is responsible for what in the project architecture.
- **Developers**: Must write 100% of Unit Tests before PR is approved.
- **Developers + QA**: Write API/Integration tests together.
- **SDET / QA Auto**: Write E2E Playwright/Cypress tests.

### Step 4 — Formulate the Strategy Document
Generate the overarching markdown file `docs/qa/Master-Strategy.md`.

```markdown
# 🧗 Master Test Strategy (Pyramid)

## The Core Philosophy
We optimize for CI feedback speed. If a behavior can be tested at the Unit level, it MUST be tested there, not the UI.

### Layer 1: Unit & Component (Jest/Vitest)
- **Scope**: Mathematical logic, React component rendering, strict data transformations.
- **Owner**: Development.

### Layer 2: API Integration (SuperTest)
- **Scope**: Database persistence, caching, 3rd party API contract validation.
- **Owner**: Dev/QA Hybrid.

### Layer 3: End-To-End (Playwright)
- **Scope**: The top 20 Critical User Journeys (Login, Payment, Signup).
- **Owner**: QA Automation Team.
```

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| Monolithic Codebase | The codebase has zero dependency injection therefore Unit tests are impossible | Accept the imperfect state. Shift the pyramid to emphasize heavy API Integration testing until the code is refactored for Unit isolation. |
| Third-Party UI | App heavily relies on external iframes (e.g. Stripe) | Define an explicit rule in the Strategy to mock these APIs during Integration, and accept a tiny amount of E2E flakiness by targeting the real external service. |

---

## ✅ Done Criteria / Verification

A Test Strategy is considered complete when:

- [ ] A definitive split (Volume ratio) is established between Unit, API, and E2E layers.
- [ ] Explicit ownership for writing and maintaining each layer is documented.
- [ ] The Strategy is published directly into the project's root `/docs` repository for visibility.
