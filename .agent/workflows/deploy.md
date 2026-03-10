---
description: Deploy application to VPS/server — covers Docker build, SSH service management, health checks, and rollback procedures.
---

# 🚀 Deploy Workflow

> **Use this workflow when**: user wants to deploy a new version to server, restart a service, or troubleshoot a failed deployment. Trigger phrases: "deploy to production", "push to VPS", "restart service", "deploy latest", `/deploy`.
>
> **Out of scope**: Does not handle cloud provider infrastructure setup (AWS, GCP, Azure provisioning) — use `orchestrate` with `devops-engineer` agent. Does not manage database migrations — use `db-workflow` before deploying.

> [!CAUTION]
> Always run database migrations BEFORE deploying new code. Deploying code that expects a new schema before migrating will cause production errors.

---

## Step 1 — Pre-Deploy Checklist

Before touching any server:

```bash
# 1. Confirm you are on the correct branch with latest code
git status
git log --oneline -5

# 2. Confirm tests pass locally
pnpm test 2>/dev/null || npm test

# 3. Confirm build succeeds
pnpm build 2>/dev/null || npm run build
```

- [ ] Tests passing
- [ ] No uncommitted changes
- [ ] Database migrations prepared (if schema changed)
- [ ] User confirmed target environment (staging / production / which VPS)

---

## ⏸️ Checkpoint: Confirm Deploy Target

```
"Ready to deploy:
- Branch: [branch-name] @ [commit-sha]
- Target: [staging/production] — [VPS IP or hostname]
- DB migrations: [None / N migrations pending]
- Estimated downtime: [0 (rolling) / ~N seconds (restart)]

Proceed? (Y / N)"
```

---

## Step 2 — Build & Push Docker Image (if Docker-based)

```bash
# Build image with version tag
docker build -t <image-name>:<version> .
docker tag <image-name>:<version> <registry>/<image-name>:<version>

# Push to registry
docker push <registry>/<image-name>:<version>
```

> **Fallback**: If no Docker registry, build directly on VPS via SSH (Step 3).

---

## Step 3 — Deploy to VPS via SSH

```bash
# SSH into target server
ssh <user>@<vps-ip>

# On the server — pull latest and restart
cd /opt/<project-name>
git pull origin <branch>
pnpm install --frozen-lockfile   # or npm ci

# Apply pending migrations (if any)
pnpm typeorm migration:run 2>/dev/null || echo "No TypeORM"
npx prisma migrate deploy 2>/dev/null || echo "No Prisma"

# Restart service  
pm2 restart <service-name>       # PM2 (Node.js)
# OR
systemctl restart <service-name>  # systemd
# OR
docker compose up -d --no-deps <service-name>  # Docker Compose
```

> **Fallback**: If SSH connection refused, check: (1) VPS is running (`ping <vps-ip>`), (2) correct port (`ssh -p 22`), (3) firewall rules (`ufw status`), (4) SSH key loaded (`ssh-add -l`).

---

## Step 4 — Health Check

After restart, verify service is healthy:

```bash
# Check process is running
pm2 status <service-name>
# OR
systemctl status <service-name>

# Check application responds
curl -s -o /dev/null -w "%{http_code}" http://localhost:<port>/health
# Expected: 200

# Check recent logs for errors
pm2 logs <service-name> --lines 50
# OR
journalctl -u <service-name> -n 50 --no-pager
```

Wait **60 seconds** after restart before declaring deploy successful. Watch for crash-loop behavior.

> **Fallback**: If health endpoint doesn't exist, check `curl http://localhost:<port>/` for 200 or expected response.

---

## Step 5 — Rollback (if health check fails)

```bash
# Git rollback
git reset --hard HEAD~1
pnpm install --frozen-lockfile
pm2 restart <service-name>

# Docker rollback
docker compose up -d <service-name>=<previous-image>:<previous-version>
```

> **Rule**: Never attempt to debug a broken deployment on production for more than 5 minutes. Roll back first, debug in staging.

---

## Step 6 — Deploy Report

Save to `docs/deploy/deploy-[YYYY-MM-DD]-[env].md` (create `docs/deploy/` if missing).

```
## Deploy Report — [Date] — [Environment]

### Version Deployed
Commit: [sha] — [commit message]
Branch: [branch]

### Services Restarted
- [service-name]: ✅ Healthy / ❌ Failed

### Health Check
- Endpoint: [url] → HTTP [code]
- Response time: [ms]

### DB Migrations Applied
- [migration-file] ✅ / None

### Issues
[Any warnings or notes]
```
