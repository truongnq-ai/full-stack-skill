---
name: Test Data Management (TDM)
description: Securely provisions, masks, and manages the lifecycle of test data in lower environments to prevent PII leakage and test collision.
category: roles/qa
metadata:
  labels: [qa, test-data, pii, masking, security, provisioning]
  triggers:
    priority: critical
    confidence: 0.9
    keywords: [test data, mock data, tdm, pii, mask data, seed db]
---

# 🗄️ Test Data Management (TDM)

> **Use this skill when**: you need realistic data for automated tests, or you are instructed to clone a Production database to Staging for deeper QA analysis. Trigger: `/qa-manage-data`.
>
> **Out of scope**: This is NOT for writing the actual Database Migration schemas (use Developer roles for `ALTER TABLE`). This purely concerns the *contents* of the rows.

---

## 🚫 Anti-Patterns

- **PII Leakage**: Moving a raw Prod DB dump to `Staging` without hashing/scrambling customer emails, SSNs, and payment keys.
- **Data Starvation**: An E2E test failing because it requires a "User with 50 Orders" but the seed script only created one user with 1 order.
- **Test Collision**: Writing a test that hardcodes `User ID = 1`. If two tests run in parallel and both try to delete `User 1`, the pipeline will flake.

---

## 🛠 Prerequisites & Tooling

1. Familiarity with the Data Privacy Policies (e.g., GDPR/CCPA).
2. Access to the environment's Database Seeding scripts (e.g., `npm run db:seed`).

---

## 🔄 Execution Workflow

### Step 1 — Identify Data Needs (The Payload)
Determine exactly what state the system needs to be in for your test.
- Does it need generic users?
- Does it need complex relational edge cases? (e.g., User with a suspended account and an active subscription).

### Step 2 — Provisioning (Isolated vs Shared)
Decide on the exact provisioning strategy based on the environment:
- **Local/CI (Isolated)**: The best approach. The test dynamically creates the data it needs via internal APIs in the `beforeAll()` hook, and destroys it in `afterAll()`.
- **Staging (Shared)**: If using a persistent DB, explicitly generate the data using a randomly appended suffix (e.g., `test_user_bc82a@example.com`) to prevent locking clashes with other QA members.

### Step 3 — Data Masking (If copying Prod data)
If explicitly instructed to debug a Prod issue by cloning data down to Staging, verify that the Masking Script has executed:
1. `users.email` -> Scrambled (e.g., `MD5_HASH@example.com`).
2. `users.password` -> Overwritten with known dev password (`$2b$10$devhash`).
3. `billing.credit_card` -> Nullified or masked (`****-****-****-1111`).
*Never bypass this step under any time pressure.*

### Step 4 — Verification
Log into the application or query the database directly to confirm the required complex Data Personas successfully exist.
Write a small markdown summary if handing off to a manual tester:
`Testing Accounts available: admin_test@app.com, blocked_test@app.com`.

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| Collision | Seed script throws "Duplicate Key Error" | The shared Staging DB wasn't completely dropped. Run `roles/qa/environment-management/SKILL.md` to cleanly wipe it, or explicitly use random UUIDs for new seeds. |
| Raw PII Escaped | You spot a real `@gmail.com` address on Staging | ABORT TESTING IMMEDIATELY. This is a SEV-1 Security Incident. Trigger `/devops-handle-incident` and purge the Staging database. |

---

## ✅ Done Criteria / Verification

A Data Management request is finished when:

- [ ] All required data personas exist and are accessible.
- [ ] Automated tests securely create/destroy their own isolated data without polluting the master pool.
- [ ] No real-world PII (Personally Identifiable Information) exists unmasked in the target environment.
