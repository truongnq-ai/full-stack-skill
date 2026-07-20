# Examples — Automation E2E

## Example 1 — Stable locator

**Input**
"page.click('.btn-123')"

**Output**
"page.getByRole('button', { name: /save/i }).click()"

**Why**
- Stable selector.
