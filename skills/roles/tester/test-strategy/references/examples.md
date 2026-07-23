# Examples — Test Strategy

## Example 1: The Testing Pyramid
**Strategy Definition**:
- **Unit Tests (Devs)**: 70% of coverage (Fast, cheap, tests isolated functions).
- **Integration Tests (Devs/QA)**: 20% of coverage (Tests API endpoints and DB queries).
- **E2E UI Tests (QA)**: 10% of coverage (Slow, brittle, tests critical user journeys like Checkout).
**Why**: Prevents the "Ice Cream Cone" anti-pattern where a team writes 500 slow Playwright UI tests and 0 fast Unit Tests.