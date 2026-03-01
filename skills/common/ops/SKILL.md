---
description: "Incident response FSM for system operations — always read logs first, assess risk before changing anything."
globs: "Dockerfile, docker-compose.yml, *.service, *.conf"
---

# Ops — Incident Response & System Operations

## Context

When managing production or staging systems, always collect information first and change state second. Never reverse this order.

## Incident Response FSM

```
[1. Collect info — CHANGE NOTHING]
     │ (read logs, status, metrics, config)
     ↓
[2. Root cause analysis]
     ↓
[3. Assess impact & risk of fix plan]
     ↓
[4. Present plan → STOP if risky, wait for confirmation]
     ↓
[5. Execute in small steps]
     ↓
[6. Verify after each step]
     ↓
[7. Summary report]
```

> Step 4 is a **hard stop** — never auto-skip even in Auto-Accept mode.

## Action Classification

### ✅ Safe — Read-only commands

```bash
ps aux / systemctl status / docker ps
journalctl -n 100 / docker logs --tail 100
top / htop / free -h / df -h / docker stats
ss -tlnp / netstat -tlnp / lsof -i :<port>
```

### ⚠️ Needs Confirmation — State changes

| Action                        | Confirm?                    |
| ----------------------------- | --------------------------- |
| Restart a specific service    | ✅ Always                   |
| Reload config without restart | ✅ If production            |
| Clear cache                   | ✅ If production            |
| Change .env values            | ✅ Always + read file first |

### 🔴 Mandatory Plan + Confirm — High risk

| Action                          | Risk                            |
| ------------------------------- | ------------------------------- |
| Stop entire service stack       | Full downtime                   |
| Delete records / truncate table | Irreversible data loss          |
| Run database migration          | Schema change, hard to reverse  |
| Change firewall / iptables      | May block all access            |
| `kill -9` process               | Not graceful, may corrupt state |
| Deploy to production            | Affects real users              |

## Risk Checklist

```
[ ] Does this action cause downtime?
[ ] Can it be rolled back? How?
[ ] What data could be lost?
[ ] Are users currently active?
[ ] Have logs been checked for root cause?
[ ] Is a backup needed first?
```
