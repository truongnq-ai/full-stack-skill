---
description: "Backup databases, migrate data between environments, and manage cloud storage operations safely."
---

# ☁️ DevOps: Data Backup & Cloud Migration

> **Use this workflow when**: DevOps needs to backup a database, migrate data between environments (dev→staging→prod), or manage cloud storage (S3, Google Drive, Cloudflare R2). Trigger: `/software-devops-backup-and-migrate`.
>
> **Out of scope**: Does not provision infrastructure — use `/software-devops-setup-infra`. Does not deploy applications — use `/software-devops-deploy-release`. Does not set up CI/CD — use `/software-devops-setup-cicd`.
>
> **Activates skills**: `skills/roles/devops/backup-migration-strategy/SKILL.md`, `skills/common/cloud-storage/SKILL.md`, `skills/common/guardrails/SKILL.md`

---

## Step 1 — Load Skills & Classify Operation

```
view_file skills/roles/devops/backup-migration-strategy/SKILL.md
view_file skills/common/guardrails/SKILL.md
```

Determine operation type:

| Type | Trigger phrase | Risk level |
|---|---|---|
| Database backup | "backup db", "dump postgres", "export data" | MEDIUM |
| Environment migration | "copy prod to staging", "seed staging from prod" | HIGH |
| Cloud storage sync | "upload to S3", "sync to Drive", "migrate files" | MEDIUM |
| Data cleanup / archive | "archive old records", "purge stale data" | HIGH |

> **Rule (Guardrails)**: For any HIGH risk operation — require explicit user confirmation before executing. Never run destructive commands without a backup first.

---

## Step 2 — Pre-Flight Safety Check

Before any data operation:

```bash
# Verify target environment
echo "Target: $TARGET_ENV"

# Check disk space
df -h 2>/dev/null || dir 2>/dev/null

# Confirm source database connection
pg_isready -h $DB_HOST -p $DB_PORT 2>/dev/null || echo "Check DB_HOST/DB_PORT env vars"
```

> **⏸️ Checkpoint**: Confirm environment, disk space, and connection before proceeding.

---

## Step 3 — Execute Backup / Migration

**Database Backup (PostgreSQL)**:
```bash
pg_dump -Fc -h $DB_HOST -U $DB_USER -d $DB_NAME > backup_$(date +%Y%m%d_%H%M%S).dump
```

**Database Restore to Target**:
```bash
pg_restore -h $TARGET_HOST -U $TARGET_USER -d $TARGET_DB --no-owner backup_*.dump
```

**Cloud Storage Sync**:
```bash
aws s3 sync ./uploads s3://$BUCKET_NAME/uploads --delete   # AWS S3
rclone sync ./uploads r2:$BUCKET_NAME/uploads              # Cloudflare R2
```

> **Rule**: Always backup BEFORE migration. Never `--delete` on production without dry-run first.

---

## ⏸️ Checkpoint: Post-Operation Verification

```
"Operation complete:
- Backup file created: [path/size]
- Records migrated: [N]
- Storage synced: [N files / N MB]

Verify data integrity? (Y — run checksums / N — skip)"
```

---

## Step 4 — Verify & Report

```bash
# Verify backup integrity
pg_restore --list backup_*.dump | wc -l

# Cloud: count files
aws s3 ls s3://$BUCKET_NAME --recursive | wc -l
```

Save operation log to `docs/ops/backup-log-$(date +%Y%m%d).md`.

---

## Done Criteria

- [ ] Backup file created before any migration
- [ ] Migration completed without errors
- [ ] Post-operation integrity check passed
- [ ] Operation log saved to `docs/ops/`
- [ ] No production data deleted without explicit confirmation

> **Required Skill**: `skills/roles/devops/backup-migration-strategy/SKILL.md`
