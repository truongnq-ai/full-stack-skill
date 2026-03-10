---
description: Database operations workflow — covers schema design, migration management, query optimization, and safe data scripts.
---

# 🗄️ Database Workflow

> **Use this workflow when**: user needs to design a schema, write migrations, optimize slow queries, or run data scripts. Trigger phrases: "add column", "create migration", "query is slow", "design schema", "clean up data", `/db-workflow`.
>
> **Out of scope**: Does not handle application-layer ORM configuration — use `code-review` for that. Does not cover DB infrastructure provisioning — use `deploy` workflow for server setup. Does not replace ANALYZE with production-only profiling tools (pg_stat, pt-query-digest).

---

## Step 1 — Identify Operation Type

Determine which mode applies:

| Mode | Trigger | Go to |
|------|---------|-------|
| **Schema Design** | New entity/table, relationship modeling | Step 2A |
| **Migration** | Add column, rename, drop, index | Step 2B |
| **Query Optimization** | Slow query, N+1, missing index | Step 2C |
| **Data Script** | Backfill data, cleanup, one-time transform | Step 2D |

---

## Step 2A — Schema Design

Gather requirements before writing DDL:
- Entity name and purpose
- Fields: name, type, nullable, default, unique constraints
- Relationships: one-to-many, many-to-many (junction table needed?)
- Indexes: which fields will be used in `WHERE`, `JOIN`, `ORDER BY`?

```sql
-- Template: New table
CREATE TABLE <entity> (
  id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  -- required fields
  created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_<field> (<field>)
);
```

> **Rule**: Always include `created_at` + `updated_at`. Never use `FLOAT` for money — use `DECIMAL(18, 8)`.

---

## Step 2B — Migration Management

```bash
# Check current migration state (adapt to ORM used)
pnpm typeorm migration:show        # TypeORM
npx prisma migrate status          # Prisma
python manage.py showmigrations    # Django
```

> **Fallback**: If no ORM detected, check for raw SQL files in `migrations/` or `db/migrations/`.

**Migration safety checklist before applying**:
- [ ] Migration is **reversible** (has `down()` method or rollback script)
- [ ] No `DROP COLUMN` or `DROP TABLE` without data backup first
- [ ] No renaming column directly (add new → backfill → drop old is safer)
- [ ] Tested on staging before production

```bash
# Apply migration (adapt to stack)
pnpm typeorm migration:run
npx prisma migrate deploy
```

---

## Step 2C — Query Optimization

```sql
-- Step 1: Get execution plan
EXPLAIN ANALYZE <your-slow-query>;

-- Step 2: Check existing indexes
SHOW INDEX FROM <table_name>;

-- Step 3: Identify missing index
-- If query filters/joins on a column without index → add it
CREATE INDEX idx_<table>_<column> ON <table> (<column>);
```

Optimization priority order:
1. **Missing index** — always check first (biggest impact)
2. **N+1 pattern** — replace with `JOIN` or batch query
3. **SELECT \*** — replace with specific column list
4. **Unparameterized queries** — risk of injection + no query plan caching

> **Fallback**: If `EXPLAIN` not available (SQLite), use query logging: `PRAGMA query_only = ON`.

---

## Step 2D — Data Script (High Risk)

> [!CAUTION]
> Data scripts are irreversible. Follow these steps strictly.

```bash
# Backup FIRST — always
mysqldump -u root -p <database> <table> > backup-$(date +%Y%m%d).sql
# Postgres fallback: pg_dump -U postgres -t <table> <database> > backup-$(date +%Y%m%d).sql

# 2. Test on a sample (LIMIT 10) before running full script
SELECT * FROM <table> WHERE <condition> LIMIT 10;

# 3. Run in a transaction — can rollback if wrong
BEGIN;
UPDATE <table> SET <field> = <value> WHERE <condition>;
-- Verify: SELECT COUNT(*) FROM <table> WHERE <condition>;
COMMIT; -- Only after verification
```

> **Rule**: Never run a data script on production without: (1) backup, (2) staging test, (3) user confirmation.

---

## ⏸️ Checkpoint: Confirm Before Destructive Operations

For any `DROP`, `DELETE`, `UPDATE` affecting >100 rows, or any migration on production:

```
"About to execute: [operation summary]
Estimated rows affected: [N]
Backup created: [Yes/No]
Staging tested: [Yes/No]

Proceed on production? (Y / N)"
```

---

## Step 3 — Verify & Report

```bash
# Verify schema change
DESCRIBE <table>;
SHOW CREATE TABLE <table>;

# Verify data script result
SELECT COUNT(*), <field> FROM <table> GROUP BY <field>;
```

Save output to `docs/db/db-operation-[YYYY-MM-DD]-[slug].md` (create `docs/db/` if missing) for audit trail.
