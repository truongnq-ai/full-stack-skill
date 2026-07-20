---
name: QA Environment Management
description: Establishes safe protocols for seeding, cleansing, and isolating data in staging/QA environments to prevent testing collisions.
category: roles/qa
metadata:
  labels: [qa, environment, test-data, devops-lite, staging]
  triggers:
    priority: medium
    confidence: 0.8
    keywords: [refresh env, seed db, clear data, staging setup]
---

# 🌍 QA Environment Management

> **Use this skill when**: the QA agent needs a clean slate to begin regression, or tests are failing due to polluted database state in the Staging/QA environment. Trigger: `/qa-reset-env`.
>
> **Out of scope**: This is NOT for provisioning absolute infrastructure (VPCs, EC2s) — use DevOps skills for that. This is bounded to Application Data state.

---

## 🚫 Anti-Patterns

- **Polluting Prod**: Accidentally running a Database Reset script while connected to the Production Database URL. (Catastrophic).
- **Shared State Clashes**: Writing tests assuming Admin User #1 is available, while another tester is simultaneously running tests altering Admin User #1's permissions.
- **Stale Data Testing**: Testing a new Sprint with a database schema/seed from 3 sprints ago.
- **Hardcoded PII**: Seeding Staging environments with raw dumps of real customer PII without anonymization/masking.

---

## 🛠 Prerequisites & Tooling

1. `curl`, `npm`, or `docker` access to trigger database seeding.
2. Distinct visibility of current Environment Variables (`NODE_ENV=staging` or `APP_ENV=qa`).
3. Explicit confirmation that the target DB hostname does NOT contain `prod`, `live`, or `primary`.

---

## 🔄 Execution Workflow

### Step 1 — Security Sanity Check (CRITICAL)
Before executing any destructive action, assert the environment constraint:
```bash
grep "DB_HOST" .env
```
Ensure it explicitly targets the staging/QA cluster. If the URL is missing a clear `qa`, `dev`, or `staging` sub-label, ABORT.

### Step 2 — Announce Environment Lock
To prevent clashes, notify the team/process that the Staging Environment is going down for maintenance.
- Update `task.md` or use Telegram integration to announce: `Staging DB resetting in 10s...`

### Step 3 — Cleanse & Migrate
Execute the project's native DB reset and schema update commands:
```bash
npm run db:drop     # Drops schema
npm run db:migrate  # Rebuilds schema to latest RC version
```

### Step 4 — Data Seeding (Faking)
Inject reproducible, anonymized mock data.
```bash
npm run db:seed
```
Ensure the seed script includes standard QA profiles:
- Standard User (`test_user@example.com` / `password123`)
- Admin User (`test_admin@example.com`)
- Edge Case User (`test_banned@example.com`)

### Step 5 — Verification & Unlock
Make a simple `curl` to the health-check endpoint or execute a simple query to assert the DB has 10 users populated.
Announce Environment Unlock. Tests may now proceed in parallel safely.

---

## ⚠️ Error Handling (Fallback)

| Scenario | Encountered | Fallback Action |
|----------|-------------|-----------------|
| Seeding Fails| `npm run db:seed` returns Error 500 or SQL Syntax error | The Schema Migration drifted from the Seed script. Assign SEV-1 Bug to Backend Devs to fix the seed script immediately. |
| Live Data Detected | Seed script attempts to connect to Production APIs | Immediately `CTRL+C` / Terminate process. Identify leaked production secrets and report Security Incident. |

---

## ✅ Done Criteria / Verification

Environment reset is verified when:

- [ ] Target environment URL explicitly matched strict `QA`/`Staging` patterns.
- [ ] Database drop, migration, and seeding processes exited with code `0`.
- [ ] Core seeded user accounts are proven to exist via a basic data query.
- [ ] Team broadcast was sent out indicating "Environment Fresh and Ready".
