---
description: Dev manages database operations — schema design, migration management, query optimization, and safe data scripts with backup-first protocol.
---

# 🗄️ Dev Database Management

> **Use this workflow when**: dev needs to design schema, write migrations, optimize queries, or run data scripts. Trigger: `/software-dev-manage-database`.
>
> **Out of scope**: Does not handle DB infrastructure provisioning — use `software-devops-setup-infra`. Does not cover application ORM config — use `software-dev-review-code`.
>
> **Activates skills**: `skills/common/system-design/SKILL.md`

---

## Step 1 — Identify Operation Type

| Mode | Trigger | Go to |
|------|---------|-------|
| **Schema Design** | New table/entity | Step 2 |
| **Migration** | Add/rename/drop column | Step 3 |
| **Query Optimization** | Slow query, N+1 | Step 4 |
| **Data Script** | Backfill, cleanup | Step 5 |

---

## Step 2 — Schema Design

Gather: Entity name, fields (name/type/nullable/default/unique), relationships, index candidates.

```sql
CREATE TABLE <entity> (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_<field> (<field>)
);
```

> **Rule**: Always include `created_at` + `updated_at`. Never use `FLOAT` for money — use `DECIMAL(18,8)`.

---

## Step 3 — Migration Management

```bash
pnpm typeorm migration:show 2>/dev/null || npx prisma migrate status 2>/dev/null
```

Safety checklist:
- [ ] Migration is reversible (has `down()`)
- [ ] No `DROP` without data backup
- [ ] No direct column rename (add new → backfill → drop old)
- [ ] Tested on staging first

> **Fallback**: If no ORM detected, check for raw SQL in `migrations/` or `db/migrations/`.

---

## Step 4 — Query Optimization

```sql
EXPLAIN ANALYZE <your-slow-query>;
SHOW INDEX FROM <table_name>;
```

Priority: (1) Missing index, (2) N+1 → JOIN, (3) SELECT * → specific columns, (4) Unparameterized queries.

> **Fallback**: If EXPLAIN unavailable, enable query logging.

---

## ⏸️ Checkpoint: Confirm Destructive Operations

For `DROP`, `DELETE`, `UPDATE` >100 rows, or production migration:

```
"About to execute: [operation]
Rows affected: [N] | Backup: [Y/N] | Staging tested: [Y/N]
Proceed? (Y / N)"
```

---

## Step 5 — Data Script (High Risk)

```bash
mysqldump -u root -p <db> <table> > backup-$(date +%Y%m%d).sql
BEGIN; UPDATE <table> SET <field>=<value> WHERE <condition>; -- verify then COMMIT;
```

> **Rule**: Never run data script on production without: (1) backup, (2) staging test, (3) user confirmation.

---

## Step 6 — Verify & Report

```sql
DESCRIBE <table>;
SELECT COUNT(*), <field> FROM <table> GROUP BY <field>;
```

Save to `docs/db/db-operation-[YYYY-MM-DD]-[slug].md`.

---

## Done Criteria

- [ ] Schema/migration applied and verified
- [ ] Backup taken before destructive operations
- [ ] Report saved to `docs/db/`
