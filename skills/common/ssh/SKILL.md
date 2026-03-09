---
name: SSH Connection Management
description: SSH connection management — tunnels, config, SCP/rsync safely. Never hardcode credentials in scripts.
metadata:
  labels:
    - ssh
    - security
    - infra
    - common
  triggers:
    priority: medium
    confidence: 0.7
    keywords:
      - ssh
      - tunnel
      - scp
      - rsync
      - port forward
    files:
      - '**/.ssh/config'
      - Dockerfile
      - docker-compose*.yml
workflow_ref: deep-security-audit
---

# SSH — Secure Connection Management

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

Manage SSH connections, tunnels, and file transfers safely. Never expose credentials or leave tunnels open indefinitely.

## SSH Config File (~/.ssh/config)

```
Host vps-main
    HostName <server-ip>
    User ubuntu
    IdentityFile ~/.ssh/id_rsa
    ServerAliveInterval 60

Host vps-staging
    HostName <staging-ip>
    User ubuntu
    Port 2222
## References
- [Examples (Input/Output)](references/examples.md)
- [Notes](references/notes.md)
