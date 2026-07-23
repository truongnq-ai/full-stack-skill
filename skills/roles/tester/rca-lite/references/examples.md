# Examples — RCA Lite

## Example 1: The 5-Whys of a Production Defect
**Symptom**: User data got mixed up in Production.
1. **Why?** The caching layer returned User A's profile to User B.
2. **Why?** The cache key didn't include the Authorization token.
3. **Why didn't QA catch this?** The QA environment only has 1 test user.
4. **Why?** Test Data Management strategy lacks concurrent multi-tenant data.

**Action Item**: Create an automated script to seed 10 distinct users and run tests in parallel to catch cross-contamination.