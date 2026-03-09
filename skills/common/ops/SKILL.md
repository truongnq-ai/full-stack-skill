---
name: Ops Incident Response
description: Incident response FSM for system operations — always read logs first, assess risk before changing anything.
metadata:
  labels: [ops, incident, reliability]
  triggers:
    priority: medium
    confidence: 0.7
    keywords: [incident, outage, restart, production, downtime]
    files: ['Dockerfile', 'docker-compose.yml', '*.service', '*.conf']
workflow_ref: smart-release
---

# Ops — Incident Response & System Operations

## **Priority: P1 (OPERATIONAL)**

## Output Template

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"] # or []
next_checks: ["<check 1>"]
```

- **Summary**: <what changed / what was done>
- **Risks**: <known risks or "none">
- **Next Checks**: <tests/verification steps>

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
## References

- [Examples (Input/Output)](references/examples.md)
