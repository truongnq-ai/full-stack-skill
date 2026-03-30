---
description: DevOps deploys application to VPS/server — Docker build, SSH service management, health checks, and rollback procedures with pre-deploy safety gates.
---

# 🚀 DevOps Deploy Release

> **Use this workflow when**: DevOps needs to deploy a new version to server, restart service, or troubleshoot failed deployment. Trigger: `/software-devops-deploy-release`.
>
> **Out of scope**: Does not run database migrations — use `software-dev-manage-database` before deploying. Does not prepare release artifacts — use `software-devops-prepare-release`.
>
> **Activates skills**: `skills/roles/devops/deploy-basics/SKILL.md`, `skills/roles/devops/monitoring/SKILL.md`

> [!CAUTION]
> Always run database migrations BEFORE deploying new code.

---

## Step 1 — Pre-Deploy Checklist

```bash
git status && git log --oneline -5
pnpm test 2>/dev/null || npm test
pnpm build 2>/dev/null || npm run build
```

- [ ] Tests passing
- [ ] No uncommitted changes
- [ ] DB migrations prepared (if schema changed)
- [ ] Target environment confirmed (staging/production)

---

## ⏸️ Checkpoint: Confirm Deploy

```
"Ready to deploy:
- Branch: [name] @ [SHA]
- Target: [staging/production] — [VPS IP]
- DB migrations: [None / N pending]
Proceed? (Y / N)"
```

---

## Step 2 — Build & Push (Docker)

```bash
docker build -t <image>:<version> .
docker push <registry>/<image>:<version>
```

> **Fallback**: If no Docker registry, build directly on VPS via SSH (Step 3).

---

## Step 3 — Deploy via SSH

```bash
ssh <user>@<vps-ip>
cd /opt/<project>
git pull origin <branch>
pnpm install --frozen-lockfile
pm2 restart <service> || systemctl restart <service> || docker compose up -d --no-deps <service>
```

> **Fallback**: If SSH refused, check: (1) VPS running, (2) correct port, (3) firewall, (4) SSH key loaded.

---

## Step 4 — Health Check

```bash
pm2 status <service> || systemctl status <service>
curl -s -o /dev/null -w "%{http_code}" http://localhost:<port>/health
pm2 logs <service> --lines 50
```

Wait **60 seconds** after restart. Watch for crash-loop.

> **Fallback**: If no health endpoint, `curl http://localhost:<port>/` for 200.

---

## Step 5 — Rollback (if health fails)

```bash
git reset --hard HEAD~1 && pnpm install --frozen-lockfile && pm2 restart <service>
```

> **Rule**: Never debug broken deploy on production >5 minutes. Roll back first, debug in staging.

---

## Step 6 — Deploy Report

Save to `docs/deploy/deploy-[YYYY-MM-DD]-[env].md`:

```
## Deploy Report — [Date] — [Env]
### Version: [SHA] — [message]
### Services: [status]
### Health: [endpoint] → HTTP [code]
### DB Migrations: [applied/none]
### Issues: [notes]
```

---

## Done Criteria

- [ ] Service running and healthy
- [ ] Health check returns 200
- [ ] No crash-loop detected
- [ ] `docs/deploy/` report saved
