# Examples — Database Migration Strategy

## Example 1 — Safe Column Rename (Expand-Contract Pattern)

**Scenario**: Rename `user_name` to `username` in the `users` table (10M rows) with zero downtime.

**Phase 1 — Expand (Migration 001)**:
```sql
-- V001__expand_add_username.sql
ALTER TABLE users ADD COLUMN username VARCHAR(255);

-- Backfill existing data
UPDATE users SET username = user_name WHERE username IS NULL;

-- Add index on new column
CREATE INDEX idx_users_username ON users(username);
```

**Deploy 1**: App code writes to BOTH `user_name` AND `username` (dual-write).

**Phase 2 — Migrate (Deploy 2)**:
App code reads from `username`, stops writing to `user_name`. Monitor for 48 hours.

**Phase 3 — Contract (Migration 002)**:
```sql
-- V002__contract_drop_user_name.sql
ALTER TABLE users DROP COLUMN user_name;
```

**Why**: At no point are running app instances broken. Old code reads `user_name`, new code reads `username`, and both exist simultaneously during the transition.

---

## Example 2 — Adding a Non-Nullable Column Safely

**Scenario**: Add `created_by` (NOT NULL) to the `orders` table.

**Bad approach** (causes downtime):
```sql
ALTER TABLE orders ADD COLUMN created_by VARCHAR(255) NOT NULL;
-- ERROR: column "created_by" contains null values (existing rows have no value)
```

**Good approach** (zero downtime):
```sql
-- Step 1: Add as nullable
ALTER TABLE orders ADD COLUMN created_by VARCHAR(255);

-- Step 2: Backfill existing rows
UPDATE orders SET created_by = 'system' WHERE created_by IS NULL;

-- Step 3: Add NOT NULL constraint
ALTER TABLE orders ALTER COLUMN created_by SET NOT NULL;
ALTER TABLE orders ALTER COLUMN created_by SET DEFAULT 'unknown';
```

**Why**: Adding NOT NULL directly fails on existing data. The 3-step approach handles existing rows gracefully.

---

## Example 3 — Prisma Migration with Rollback

**Scenario**: Add `phone` column to `users` using Prisma.

```bash
# Generate migration
npx prisma migrate dev --name add_phone_to_users

# This creates: prisma/migrations/20260723_add_phone_to_users/migration.sql
```

Generated SQL:
```sql
ALTER TABLE "users" ADD COLUMN "phone" VARCHAR(20);
```

Rollback script (manual, Prisma doesn't auto-generate):
```sql
ALTER TABLE "users" DROP COLUMN "phone";
```

**Test on staging**:
```bash
# Apply
npx prisma migrate deploy

# Verify
npx prisma db pull  # Check schema matches expected state
```

**Why**: Always generate, review, and test migration SQL before production. Never trust auto-generated migrations blindly.
