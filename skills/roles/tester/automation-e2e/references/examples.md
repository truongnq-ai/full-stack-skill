# Examples — Automation E2E

## Example 1: Stable Locators
**Bad Practice**: `page.locator('.btn-primary > span')`
**Good Practice**: `page.getByRole('button', { name: 'Submit Order' })`
**Why**: CSS classes change frequently during redesigns, but accessibility roles and labels remain stable.

## Example 2: Dynamic Wait
**Bad Practice**: `await page.waitForTimeout(5000);`
**Good Practice**: `await expect(page.getByText('Payment Successful')).toBeVisible({ timeout: 10000 });`
**Why**: Hardcoded sleeps slow down the test suite and cause flakes on slow CI environments. Dynamic assertions resolve as soon as the element appears.