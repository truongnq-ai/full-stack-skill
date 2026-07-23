# Examples — Feature Flag Practice

## Example 1 — Feature Service Abstraction

**Bad** (Raw SDK usage scattered everywhere):
```typescript
import { LaunchDarkly } from 'launchdarkly-node-sdk';
if (LaunchDarkly.variation('enable-new-checkout-v2', user, false)) {
  renderNewCheckout();
}
```

**Good** (Domain-specific wrapper):
```typescript
// src/services/FeatureService.ts
export class FeatureService {
  static isNewCheckoutEnabled(user: UserContext): boolean {
    return flagClient.variation('enable-new-checkout-v2', user, false);
  }
}

// Usage
if (FeatureService.isNewCheckoutEnabled(userContext)) {
  renderNewCheckout();
}
```

**Why**: If you switch from LaunchDarkly to Split.io next year, you change 1 file instead of 47.

---

## Example 2 — The Cleanup Ticket

When creating `enable-v2-api` flag:
1. Create Jira ticket: `TECH-456: Remove flag enable-v2-api`
2. Set due date: 2 weeks after planned 100% rollout
3. Add to sprint backlog

**Why**: Without the cleanup ticket, 6 months later the flag is still in the codebase, and nobody remembers if it's safe to remove.

---

## Example 3 — DB Schema + Feature Flag (Expand-Contract)

**Scenario**: New checkout requires a `discount_code` column. You can't roll back a column addition with a flag.

**Solution**: Use Expand-Contract from `database-migration-strategy/SKILL.md`:
1. Migration adds `discount_code` (nullable) — always safe
2. Flag controls whether the UI shows the discount field
3. Both old and new code paths work with or without the column populated
