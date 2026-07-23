---
name: Database Migration Strategy
description: Safe protocols for evolving database schemas — migration versioning, zero-downtime changes, rollback strategies, and data backfill operations.
category: roles/dev
metadata:
  labels: [dev, database, migration, schema, versioning, rollback]
  triggers:
    priority: high
    confidence: 0.95
    keywords: [database migration, schema change, add column, alter table, migration rollback, flyway, prisma migrate]
    file_patterns: ["**/migrations/**", "**/migrate/**", "prisma/schema.prisma", "**/flyway/**", "**/alembic/**"]
    context: ["user asks to change database schema", "user adds a new table or column", "user asks about migration strategy"]
    negative: ["user asks about query optimization", "user asks about caching strategy"]
---

# 🗄️ Database Migration Strategy

> **Use this skill when**: modifying database schema (adding tables, columns, indexes, constraints) in a way that must be safe, reversible, and compatible with zero-downtime deployments. Trigger: `/dev-db-migrate`.
>
> **Out of scope**: Query optimization and performance tuning (`performance-engineering/SKILL.md`). Data warehouse design and analytics schemas belong to `roles/bda/`. This governs the *safe evolution of operational database schemas*.

---

## 🚫 Anti-Patterns

- **The Manual ALTER TABLE**: SSH-ing into the production database and running `ALTER TABLE users ADD COLUMN phone VARCHAR(20)` directly. No version control, no rollback path, no audit trail.
- **The Big Bang Migration**: Renaming a column from `user_name` to `username` in a single migration while the app is live. Every running instance of the application instantly crashes because the old code still references `user_name`.
- **Migration Without Backup**: Running a destructive migration (`DROP COLUMN`, `ALTER TYPE`) without first backing up the affected data. The migration has a bug, 500K rows of data are silently corrupted, and there's no recovery path.
- **Coupled Code + Schema**: Deploying application code that requires the new column AND the migration that creates it in the same release. If the migration fails, the app crashes. If the app deploys first, it crashes before the migration runs.
- **Seed Data in Migrations**: Mixing schema DDL changes with business data seeding (INSERT statements) in the same migration file. Schema migrations should be deterministic and repeatable; data seeding is context-dependent.

---

## 🛠 Prerequisites & Tooling

1. A migration framework (Prisma Migrate, Flyway, Alembic, Knex, TypeORM migrations, golang-migrate).
2. A staging database that mirrors production schema.
3. Database backup/restore capability.

---

## 🔄 Execution Workflow

### Step 1 — Assess the Migration Risk Level

Classify the change before writing any SQL:

| Risk Level | Examples | Strategy |
|------------|----------|----------|
| 🟢 **Low** | Add nullable column, add index, add table | Single migration, no app code change needed |
| 🟡 **Medium** | Add non-nullable column with default, rename column | Expand-Contract pattern (2-phase) |
| 🔴 **High** | Drop column, change column type, drop table | Expand-Contract with data backfill (3-phase) |

### Step 2 — The Expand-Contract Pattern (Safe Schema Evolution)

For Medium/High risk changes (e.g., renaming `user_name` → `username`):

**Phase 1 — Expand (Migration 1 + Deploy 1)**:
1. Add the NEW column `username` (nullable).
2. Deploy app code that writes to BOTH `user_name` AND `username` (dual-write).
3. Run a backfill script to copy existing `user_name` values to `username`.

**Phase 2 — Migrate (Deploy 2)**:
1. Deploy app code that reads from `username` (not `user_name`).
2. Stop writing to `user_name`.
3. Verify in production for 1–2 days.

**Phase 3 — Contract (Migration 2 + Deploy 3)**:
1. Drop the old column `user_name`.
2. Remove all references to `user_name` from code.

*This ensures zero-downtime because old and new app versions can coexist during the transition.*

### Step 3 — Write the Migration File

Use the migration framework's CLI to generate a versioned migration:

```bash
# Prisma
npx prisma migrate dev --name add_phone_to_users

# Flyway
# Create: V20260723_1__add_phone_to_users.sql

# Alembic
alembic revision --autogenerate -m "add_phone_to_users"
```

**Rules**:
- Each migration file MUST be idempotent (running it twice should not crash).
- Each migration file MUST have a corresponding rollback (down migration).
- File names include timestamps or sequential version numbers for ordering.

### Step 4 — Test on Staging First

**NEVER run migrations directly on production without testing:**
1. Restore a production snapshot to the staging database.
2. Run the migration on staging.
3. Verify: Does the app still work? Are existing queries still functional?
4. Run the rollback on staging. Verify the schema reverts cleanly.

### Step 5 — Backup Before Production Migration

Before executing on production:
1. Take a database backup (or ensure automated backups are recent).
2. Run the migration during low-traffic periods if it involves table locks.
3. Monitor for lock contention and long-running queries.
4. Have the rollback command ready to execute immediately if issues arise.

> **⏸️ Checkpoint**:
> "Migration file đã tạo và test trên staging thành công. Rollback cũng verified. Bạn có muốn tôi thực thi trên production không? (Y/N)"

---

## 🛠️ Tooling & Execution

| Action | Tool | Example |
|--------|------|---------|
| Check current schema | `call_mcp_tool` → `postgres/query` | `SELECT column_name FROM information_schema.columns WHERE table_name = 'users'` |
| Generate migration | `run_command` | `npx prisma migrate dev --name add_phone` |
| Run migration | `run_command` | `npx prisma migrate deploy` |
| Verify schema | `call_mcp_tool` → `postgres/query` | `\d users` or `SHOW CREATE TABLE users` |
| Backup | `call_mcp_tool` → `ssh/ssh_exec` | `pg_dump -Fc mydb > backup.dump` |
| Rollback | `run_command` | `npx prisma migrate reset` or manual down migration |
| Read migration files | `view_file` | Inspect generated SQL |
| Find schema refs | `grep_search` | Search for old column names in codebase |

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| Migration Lock Timeout | `ALTER TABLE` hangs because a long-running transaction holds a lock on the table | Cancel the migration. Identify the blocking transaction with `SELECT * FROM pg_stat_activity WHERE wait_event_type = 'Lock'`. Wait for it to complete or terminate it, then retry. |
| Partial Migration Failure | Migration crashes halfway — some columns added, others not | Check the migration framework's transaction support. Flyway and Prisma run each migration in a transaction by default. If not, manually inspect the schema state and apply the remaining steps. |
| Data Corruption During Backfill | The backfill script introduces bad data (e.g., truncated strings, encoding issues) | Stop the backfill immediately. Restore from the pre-migration backup. Fix the backfill script, test on staging again, and retry. |
| Cannot Rollback | The "down" migration drops a column that contained user data, and there's no backup | This is why Step 5 exists. If you're already in this situation, check WAL (Write-Ahead Log) archives or point-in-time recovery. Create an incident ticket. |

---

## ✅ Done Criteria / Verification

A database migration is safe when:

- [ ] The migration is version-controlled alongside application code.
- [ ] A corresponding rollback (down migration) exists and has been tested.
- [ ] The migration has been successfully run on a staging environment mirroring production.
- [ ] For destructive changes: the Expand-Contract pattern is used with separate deploy phases.
- [ ] A database backup was verified before production execution.

---

## 📚 Cross-References

- `roles/dev/design-review-checklist/SKILL.md` — Step 2 validates schema design during design reviews.
- `roles/dev/performance-engineering/SKILL.md` — Index additions are a common migration that impacts query performance.
- `roles/dev/api-contract/SKILL.md` — Schema changes may require API contract updates.
- `roles/dev/feature-flag-practice/SKILL.md` — Feature flags enable safe dual-write patterns during migrations.
