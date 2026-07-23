# Examples — Flake Control

## Example 1: Quarantining a Flaky Test
**Scenario**: `checkout.spec.ts` fails 1 out of 5 times on GitHub Actions.
**Action**:
1. Add `test.skip('Flaky: BUG-201', async ({ page }) => { ... })`
2. Create `BUG-201: Investigate race condition in checkout spec`.
**Why**: Removing the flaky test from the critical path restores trust in the CI/CD pipeline, allowing developers to merge PRs without dealing with false negatives.