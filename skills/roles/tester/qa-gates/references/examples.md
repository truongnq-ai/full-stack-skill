# Examples — QA Gates

## Example 1: Entry Gate Rejection
**Developer Action**: Moves `US-55` to "Ready for QA".
**QA Action**: Checks the PR. Notices there are no Unit Tests, and SonarQube shows 40% coverage.
**Result**: QA moves the ticket back to "In Progress" and tags the developer: "Blocked: Fails QA Entry Gate (Minimum 80% Unit Test coverage required)."

## Example 2: Exit Gate Waiver
**Scenario**: 1 Minor (S4) visual bug remains, but the marketing deadline is today.
**Action**: The PM formally documents a Waiver in Jira. QA allows the Exit Gate to pass with the known defect.