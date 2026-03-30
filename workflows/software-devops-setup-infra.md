---
description: DevOps provisions infrastructure — server setup, Docker configuration, environment variables, networking, and secrets management for new or existing projects.
---

# 🏗️ DevOps Setup Infrastructure

> **Use this workflow when**: DevOps needs to set up a new server, configure Docker environment, or provision infrastructure for a project. Trigger: `/software-devops-setup-infra`.
>
> **Out of scope**: Does not deploy code — use `software-devops-deploy-release`. Does not handle incidents — use `software-devops-handle-incident`.
>
> **Activates skills**: `skills/roles/devops/infra-basics/SKILL.md`, `skills/roles/devops/env-promotion/SKILL.md`, `skills/roles/devops/secrets-management/SKILL.md`

---

## Step 1 — Define Infrastructure Scope

| Mode | Action |
|------|--------|
| **New VPS** | Provision from scratch |
| **New Project on Existing VPS** | Add service to existing server |
| **Environment Promotion** | Set up staging/production pipeline |

Gather: OS, server specs, services needed, domain/SSL requirements.

---

## Step 2 — Server Bootstrap

```bash
ssh <user>@<vps-ip>
apt update && apt upgrade -y
apt install -y docker.io docker-compose nginx certbot
systemctl enable docker
```

> **Fallback**: If non-Debian, adapt package manager (`yum`, `dnf`, `apk`).

---

## Step 3 — Docker Configuration

```bash
mkdir -p /opt/<project>
cat > /opt/<project>/docker-compose.yml << 'EOF'
version: '3.8'
services:
  app:
    image: <image>:<tag>
    ports: ["<host>:<container>"]
    env_file: .env
    restart: unless-stopped
EOF
```

---

## Step 4 — Secrets Management

```
view_file skills/roles/devops/secrets-management/SKILL.md
```

- [ ] `.env` file created with all required variables
- [ ] No secrets in git history (`git log -p | grep -i password`)
- [ ] File permissions: `chmod 600 .env`

> **Rule**: Never commit `.env` to git. Use `.env.example` as template.

---

## ⏸️ Checkpoint: Verify Setup

```
"Infrastructure ready:
- Server: [IP] — [OS]
- Docker: [running/stopped]
- Services: [list]
- SSL: [configured/pending]
Proceed to health check? (Y / N)"
```

---

## Step 5 — Connectivity & Health

```bash
docker compose up -d
curl -s -o /dev/null -w "%{http_code}" http://localhost:<port>/health
certbot --nginx -d <domain> --non-interactive --agree-tos -m <email>
```

> **Fallback**: If health fails, check: `docker logs <container>`.

---

## Done Criteria

- [ ] Server accessible via SSH
- [ ] Docker services running
- [ ] Health check returns 200
- [ ] SSL configured (if domain provided)
- [ ] Secrets stored securely (not in git)
