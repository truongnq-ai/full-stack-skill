---
name: End-to-End Automation Standards
description: Governs the architecture, stability, and selector strategies for End-to-End browser UI automation (Playwright/Cypress). Includes automated script execution.
category: roles/tester
metadata:
  labels: [qa, automation, e2e, playwright, cypress, tester]
  triggers:
    priority: medium
    confidence: 0.85
    keywords: [write automation, e2e test, playwright, cypress, ui testing, automate test]
    file_patterns: ["e2e/**/*.spec.ts", "tests/e2e/**/*.ts"]
    context: ["user asks to automate a UI workflow", "user asks to write playwright test"]
---

# 🤖 End-to-End Automation Standards

> **Use this skill when**: the agent is tasked to write, refactor, or review an End-to-End (E2E) UI test utilizing Playwright, Cypress, or Selenium. Trigger: `/qa-write-e2e`.
>
> **Out of scope**: This is NOT for writing internal Unit/Component tests (e.g., Jest/Vitest). This exclusively governs full-stack browser-driven tests.

---

## 🚫 Anti-Patterns

- **Fragile Selectors**: Using `nth-child(2) > div > span` or layout-based XPath to click a button. (Breaks immediately if UI changes).
- **Static Sleeps/Waits**: Using `await page.waitForTimeout(5000)` or `time.sleep(5)` instead of dynamic assertions (`waitForSelector`).
- **Shared State**: Test A logs in and relies on Test B to clean up the user. (Tests must be 100% isolated).
- **Giant Monolithic Tests**: Writing a single 500-line test that checks Login, Navigation, Checkout, and Profile in one sequential run. (If it fails at step 2, steps 3-4 are lost).

---

## 🛠 Prerequisites & Tooling

1. Automation framework installed (`npx playwright install` or `cypress open`).
2. Familiarity with the target web application's generic Locators (`data-testid`).

**Required Tools**: Use `run_command` to execute the Playwright/Cypress test runner to verify scripts.

---

## 🔄 Execution Workflow

### Step 1 — User Flow Identification
- Read the User Stories from `PRD.md` or business requirements.
- Identify the exact sequence of clicks, inputs, and navigations.

### Step 2 — Locator Strategy (The Golden Rule)
Enforce strict Locator priority. When writing E2E scripts, you MUST extract elements in this descending order of preference:
1. `data-testid` (e.g., `[data-testid="submit-btn"]`)
2. Accessible Roles (e.g., `getByRole('button', { name: 'Submit' })`)
3. `aria-label` or `placeholder` texts.
4. Specific CSS classes `.btn-primary` (Use as last resort).
*Never* use layout-based XPath or ID chains.

### Step 3 — Test Structure (AAA Pattern)
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

### Step 4 — Dynamic Waiting & Assertions
Replace all hardcoded sleeps with state-based waits.
- Wait for network idle: `await page.waitForLoadState('networkidle')`.
- Wait for element visibility: `expect(locator).toBeVisible({ timeout: 10000 })`.

### Step 5 — Data Isolation (Setup/Teardown)
Ensure the test generates its own data.
Use `beforeEach` to create a fresh user via API, and `afterEach` to delete that user via API. Do NOT use the UI to setup test data, it is immensely slow and flaky.

> **⏸️ Checkpoint**: 
> "Kịch bản E2E automation (Playwright/Cypress) đã được sinh ra. Bạn có muốn tôi dùng lệnh `run_command` để chạy thử nghiệm ngay bây giờ không? (Y/N)"

---

## ⚠️ Error Handling (Fallback)

| Scenario | Encountered | Fallback Action |
|----------|-------------|-----------------|
| Test Flakiness | Test passes 80% of the time, fails 20% on CI | Invoke `roles/tester/flake-control/SKILL.md`. Wrap the flaky assertion in a retry block or investigate the asynchronous DOM mutation causing the race condition. |
| Missing TestIDs| App lacks `data-testid` entirely | Stop writing E2E. Assign a task back to Developers to inject `data-testid` markers into the core UI components before continuing automation. |
| Locator Errors | Playwright returns `TimeoutError: locator resolved to 0 elements` | Check network tab or logs to see if the page actually loaded. Use `waitForResponse` to guarantee backend readiness. |

---

## ✅ Done Criteria / Verification

An E2E Test script is verified when:

- [ ] It contains absolutely NO hardcoded `sleep()` or `waitForTimeout()` commands.
- [ ] At least 90% of selectors target `data-testid` or ARIA roles.
- [ ] The test is completely atomic (can be run in parallel with 10 exact copies of itself without DB conflict).
- [ ] There is an explicit assertion for the final success state.

---

## 📚 Cross-References

- **Flake Control**: `roles/tester/flake-control/SKILL.md` (If tests are unstable)
- **QA Gates**: `roles/tester/qa-gates/SKILL.md` (E2E requirements for merge)
- **Environment Management**: `roles/tester/environment-management/SKILL.md` (For sandbox state isolation)
