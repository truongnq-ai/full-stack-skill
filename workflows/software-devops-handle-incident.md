---
description: DevOps handles production incidents — structured triage, root cause investigation, service recovery, and post-incident report with prevention plan.
---

# 🚨 DevOps Handle Incident

> **Use this workflow when**: production service is down, degraded, or experiencing anomalous behavior. Trigger: `/software-devops-handle-incident`.
>
> **Out of scope**: Does not fix application bugs — use `software-dev-fix-bug` after recovery. Does not handle planned deployments — use `software-devops-deploy-release`.
>
> **Activates skills**: `skills/roles/devops/incident-runbook/SKILL.md`, `skills/roles/devops/incident-comms/SKILL.md`, `skills/roles/devops/monitoring/SKILL.md`

---

## Step 1 — Triage & Severity

```bash
ssh <user>@<vps-ip>
systemctl status <service> || pm2 status <service> || docker compose ps
tail -n 200 /var/log/syslog 2>/dev/null | grep -i error
```

| Severity | Definition | Response Time |
|----------|-----------|--------------|
| **SEV-1** | Service completely down | Immediate |
| **SEV-2** | Degraded (slow, partial outage) | ≤15 min |
| **SEV-3** | Non-critical component affected | ≤1 hour |

---

## Step 2 — Quick Recovery

**Priority**: Restore service FIRST, investigate SECOND.

```bash
pm2 restart <service> || systemctl restart <service> || docker compose restart <service>
curl -s -o /dev/null -w "%{http_code}" http://localhost:<port>/health
```

If restart fails:
```bash
docker logs <container> --tail 50
journalctl -u <service> -n 100 --no-pager
```

> **Fallback**: If service won't start, rollback: `git reset --hard HEAD~1 && pm2 restart <service>`.

---

## ⏸️ Checkpoint: Service Status

```
"Service status after recovery attempt:
- Service: [running/stopped]
- Health: HTTP [code]
- Severity: SEV-[1/2/3]
- Investigate root cause now? (Y / N)"
```

---

## Step 3 — Root Cause Investigation

```bash
git log --oneline -10
dmesg | tail -20
free -m && df -h
```

Common causes:
| Signal | Likely Cause |
|--------|-------------|
| OOM killer | Memory leak → increase limits or fix code |
| Disk full | Log rotation missing → clean + configure |
| Port conflict | Another process on same port → `lsof -i:<port>` |
| Config error | Bad env var → verify `.env` |
| Network | Firewall/DNS change → `ufw status`, `dig` |

---

## Step 4 — Stabilize & Monitor

```bash
pm2 logs <service> --lines 100
watch -n 5 "curl -s -o /dev/null -w '%{http_code}' http://localhost:<port>/health"
```

Monitor for **30 minutes** after recovery. If service crashes again → escalate.

---

## Step 5 — Post-Incident Report

Save to `docs/incidents/incident-[YYYY-MM-DD]-[slug].md`:

```
## Incident Report — [Date]
### Timeline
- [HH:MM] Detected: [how]
- [HH:MM] Response: [action taken]
- [HH:MM] Resolved: [confirmation]
### Root Cause: [explanation]
### Impact: [duration, users affected]
### Prevention: [what to change to prevent recurrence]
### Action Items: [specific tasks with owners]
```

---

## Done Criteria

- [ ] Service restored and healthy
- [ ] Root cause identified
- [ ] `docs/incidents/` report saved
- [ ] Prevention actions documented
