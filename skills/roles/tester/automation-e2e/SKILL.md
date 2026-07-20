---
name: End-to-End Automation Standards
description: Governs the architecture, stability, and selector strategies for End-to-End browser UI automation (Playwright/Cypress).
category: roles/qa
metadata:
  labels: [qa, automation, e2e, playwright, cypress]
  triggers:
    priority: medium
    confidence: 0.85
    keywords: [e2e, playwright, cypress, automate test, ui test]
---

# 🤖 End-to-End Automation Standards

> **Use this skill when**: the agent is tasked to write, refactor, or review an End-to-End (E2E) UI test utilizing Playwright, Cypress, or Selenium. Trigger: `/qa-write-e2e`.
>
> **Out of scope**: This is NOT for writing internal Unit/Component tests (e.g., Jest/Vitest). This exclusively governs full-stack browser-driven tests.

---

## 🚫 Anti-Patterns

- **Fragile Selectors**: Using `nth-child(2) > div > span` to click a button. (Breaks immediately if UI changes).
- **Static Sleeps/Waits**: Using `await page.waitForTimeout(5000)` instead of dynamic assertions (`waitForSelector`).
- **Shared State**: Test A logs in and relies on Test B to clean up the user. (Tests must be 100% isolated).
- **Giant Monolithic Tests**: Writing a single 500-line test that checks Login, Navigation, Checkout, and Profile in one sequential run. (If it fails at step 2, steps 3-4 are lost).

---

## 🛠 Prerequisites & Tooling

1. Automation framework installed (`npx playwright install` or `cypress open`).
2. Familiarity with the target web application's generic Locators (`data-testid`).

---

## 🔄 Execution Workflow

### Step 1 — Locator Strategy (The Golden Rule)
Enforce strict Locator priority. When writing E2E scripts, you MUST extract elements in this descending order of preference:
1. `data-testid` (e.g., `[data-testid="submit-btn"]`)
2. Accessible Roles (e.g., `getByRole('button', { name: 'Submit' })`)
3. `aria-label` or `placeholder` texts.
4. Specific CSS classes `.btn-primary` (Use as last resort).
*Never* use layout-based XPath or ID chains.

### Step 2 — Test Structure (AAA Pattern)
Every E2E test must follow the Arrange, Act, Assert pattern explicitly.

**Playwright Example**:
```javascript
test('User can submit checkout form', async ({ page }) => {
  // 1. Arrange
  await page.goto('/checkout');
  await page.fill('[data-testid="cc-input"]', '4111');
  
  // 2. Act
  await page.click('[data-testid="pay-btn"]');
  
  // 3. Assert
  await expect(page.locator('[data-testid="success-msg"]')).toBeVisible();
});
```

### Step 3 — Dynamic Waiting & Assertions
Replace all hardcoded sleeps with state-based waits.
- Wait for network idle: `await page.waitForLoadState('networkidle')`.
- Wait for element visibility: `expect(locator).toBeVisible({ timeout: 10000 })`.

### Step 4 — Data Isolation (Setup/Teardown)
Ensure the test generates its own data.
Use `beforeEach` to create a fresh user via API, and `afterEach` to delete that user via API. Do NOT use the UI to setup test data, it is immensely slow and flaky.

---

## ⚠️ Error Handling (Fallback)

| Scenario | Encountered | Fallback Action |
|----------|-------------|-----------------|
| Test Flakiness | Test passes 80% of the time, fails 20% on CI | Invoke `skills/roles/qa/flake-control/SKILL.md`. Wrap the flaky assertion in a retry block or investigate the asynchronous DOM mutation causing the race condition. |
| Missing TestIDs| App lacks `data-testid` entirely | Stop writing E2E. Assign a task back to Developers to inject `data-testid` markers into the core UI components before continuing automation. |

---

## ✅ Done Criteria / Verification

An E2E Test script is verified when:

- [ ] It contains absolutely NO hardcoded `sleep()` or `waitForTimeout()` commands.
- [ ] At least 90% of selectors target `data-testid` or ARIA roles.
- [ ] The test is completely atomic (can be run in parallel with 10 exact copies of itself without DB conflict).
