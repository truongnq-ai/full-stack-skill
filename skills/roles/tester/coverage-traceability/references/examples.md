# Examples — Coverage & Traceability

## Example 1: Traceability Matrix Mapping
**User Story**: `US-42: User can reset password via email.`
**Mapped Test Cases**:
1. `TC-101`: Valid email receives reset link. (Functional)
2. `TC-102`: Invalid email format shows inline error. (Boundary)
3. `TC-103`: Rate limit kicks in after 5 requests. (Security)

**Why**: Ensures that when `US-42` is marked "Ready for Release", QA knows exactly which 3 tests must pass to confidently sign off.