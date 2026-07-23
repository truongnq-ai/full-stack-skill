# Examples — Test Data Management

## Example 1: Isolated E2E Data Setup
**Bad Practice**: Hardcoding `login('test_user@example.com')` and assuming that user exists in the DB.
**Good Practice**:
```typescript
test.beforeAll(async () => {
  // Use API to create a fresh user specifically for this test run
  user = await api.createUser({ plan: 'premium' });
});
test.afterAll(async () => {
  // Clean up
  await api.deleteUser(user.id);
});
```
**Why**: Prevents parallel tests from mutating the same user and causing flaky failures.