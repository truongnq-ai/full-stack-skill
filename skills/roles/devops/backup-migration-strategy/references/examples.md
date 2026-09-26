# Backup & Migration — Reference Examples

## PostgreSQL Backup Output (expected)

```bash
$ pg_dump -Fc -h localhost -U myuser -d mydb > backup_20260926_100000.dump
$ ls -lh backup_20260926_100000.dump
-rw-r--r-- 1 user group 42M Sep 26 10:00 backup_20260926_100000.dump
```

Verify the dump is readable:
```bash
$ pg_restore --list backup_20260926_100000.dump | head -5
; Archive created at 2026-09-26 10:00:00 UTC
;     dbname: mydb
;     TOC Entries: 283
;     Compression: -1
;     Dump Version: 1.15-0
```

## PostgreSQL Restore Output (expected)

```bash
$ pg_restore -h localhost -U myuser -d mydb_staging --no-owner --clean backup_20260926_100000.dump
# Successful: no output (exit code 0)
$ echo $?
0
```

Error example (wrong credentials):
```
pg_restore: error: connection to server at "localhost", port 5432 failed: FATAL: password authentication failed
→ Fix: verify $TARGET_USER and $TARGET_DB values
```

## AWS S3 Sync Dry-Run Output (expected)

```bash
$ aws s3 sync ./uploads s3://my-bucket/uploads --dry-run
(dryrun) upload: uploads/image1.jpg to s3://my-bucket/uploads/image1.jpg
(dryrun) upload: uploads/image2.png to s3://my-bucket/uploads/image2.png
(dryrun) delete: s3://my-bucket/uploads/old-file.txt
```

**Review the dry-run output with user before removing the `--dry-run` flag.**

## rclone Sync Output (expected)

```bash
$ rclone sync ./uploads r2:my-bucket --dry-run --progress
Transferred:       2 / 2, 100%
Checks:            5 / 5, 100%
Elapsed time:      0.5s
```

## Post-Migration Verification

```bash
# Compare record count: source vs target
$ psql -h $SOURCE_HOST -U $SOURCE_USER -d $SOURCE_DB -c "SELECT COUNT(*) FROM users;"
 count
-------
  1042

$ psql -h $TARGET_HOST -U $TARGET_USER -d $TARGET_DB -c "SELECT COUNT(*) FROM users;"
 count
-------
  1042   ← must match
```

## Risk Classification Quick Reference

| Scenario | Risk | Required steps |
|---|:---:|---|
| Daily backup, no restore | LOW | Just run pg_dump |
| Restore to local dev | LOW | pg_restore with --no-owner |
| Seed staging from prod dump | MEDIUM | Backup target first + confirm env |
| Migrate files to new S3 bucket | MEDIUM | Dry-run review + confirm |
| Production restore from backup | CRITICAL | Full prod backup + written approval |
| Purge old records (bulk DELETE) | HIGH | Soft delete first, batch size ≤1000 |
