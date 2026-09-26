---
name: devops-backup-migration-strategy
description: Standards and safety protocols for database backup, data migration between environments, and cloud storage operations.
metadata:
  priority: P1
  version: 1.0
  labels:
    - devops
    - backup
    - migration
    - cloud-storage
    - data-safety
  triggers:
    priority: high
    confidence: 0.8
    keywords:
      - backup
      - migrate data
      - dump database
      - restore
      - sync storage
      - cloud migration
      - pg_dump
      - s3 sync
workflow_ref: software-devops-backup-and-migrate
---

# DevOps: Backup & Migration Strategy

## **Priority: P1**

> **Use this skill when**: Any workflow involves moving, copying, archiving, or restoring data between systems or environments.

## Core Safety Rules

- **Backup-First Principle**: ALWAYS create a backup before any migration or destructive operation. No exceptions.
- **Dry-Run First**: For cloud sync with `--delete` flag, ALWAYS run with `--dry-run` first and present output to user.
- **Environment Isolation**: Never read from production and write to production in the same command. Use intermediate dump files.
- **Explicit Confirmation Gate**: For HIGH-risk operations (production restore, data purge), HALT and require explicit "YES, PROCEED" from user.

## Risk Classification

| Operation | Risk | Required Safeguard |
|---|---|---|
| Backup only (read) | LOW | None |
| Restore to non-prod | MEDIUM | Verify target env |
| Cross-env migration | HIGH | Backup + dry-run + confirm |
| Purge / archive | HIGH | Backup + soft-delete first |
| Production restore | CRITICAL | Full backup + user approval |

## Key Commands

```bash
# PostgreSQL backup
pg_dump -Fc -h $DB_HOST -U $DB_USER -d $DB_NAME > backup_$(date +%Y%m%d_%H%M%S).dump

# PostgreSQL restore
pg_restore -h $TARGET_HOST -U $TARGET_USER -d $TARGET_DB --no-owner --clean backup.dump

# S3 dry-run sync
aws s3 sync ./src s3://$BUCKET --dry-run

# rclone sync (Cloudflare R2)
rclone sync ./src r2:$BUCKET --dry-run
```

## Anti-Patterns

- Running `pg_restore` directly on production without a backup of the target
- Using `--delete` on S3 sync without dry-run review
- Hardcoding DB credentials in scripts (use env vars only)
- Skipping post-migration integrity verification

## Verification Checklist

- [ ] Backup file exists and is non-zero size before migration?
- [ ] Target environment confirmed (not accidentally pointing to prod)?
- [ ] Dry-run completed for sync/delete operations?
- [ ] User explicitly confirmed HIGH/CRITICAL risk operations?
- [ ] Post-operation record count or checksum verified?
- [ ] Operation log saved to `docs/ops/`?

## References

- [Command Examples & Expected Output](references/examples.md)

