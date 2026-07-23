# Examples — Regression Testing

## Example 1: Maintaining the Suite
**Scenario**: The "Login with Facebook" feature was deprecated and removed from the app.
**Action**: DO NOT just `.skip()` the regression test. Explicitly DELETE the test file `login_facebook.spec.ts` to keep the regression suite lean and fast.

## Example 2: Tagging Tests
**Action**: Tag critical core flows with `@smoke` and comprehensive flows with `@regression`. This allows CI pipelines to run a fast 2-minute smoke test on every PR, and a full 20-minute regression test on the nightly build.