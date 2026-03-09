---
name: SSH Connection Management
description: SSH connection management — tunnels, config, SCP/rsync safely. Never hardcode credentials in scripts.
metadata:
  labels: [ssh, security, infra]
  triggers:
    priority: medium
    confidence: 0.7
    keywords: [ssh, tunnel, scp, rsync, port forward]
    files: ['**/.ssh/config', 'Dockerfile', 'docker-compose*.yml']
workflow_ref: deep-security-audit
---

# SSH — Secure Connection Management

## **Priority: P1 (OPERATIONAL)**

## Output Template

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
    IdentityFile ~/.ssh/id_staging

Host internal-server
    HostName 10.0.0.5
    ProxyJump vps-main
```

After config: `ssh vps-main` replaces `ssh -i key user@ip`.

## SSH Tunnels

```bash
# Local forwarding: access remote DB from localhost
ssh -L 5433:localhost:5432 vps-main -N -f

# Remote forwarding: expose local service to remote
ssh -R 9000:localhost:3000 vps-main -N -f

# Check active tunnels
ps aux | grep "ssh -L"

# Kill tunnel
kill <PID>
```

## File Transfer

```bash
scp local-file.txt vps-main:/home/ubuntu/       # Upload
scp vps-main:/home/ubuntu/log.txt ./             # Download
rsync -avz ./dir/ vps-main:/remote/dir/          # Sync (efficient)
rsync -avzn ./dir/ vps-main:/remote/dir/         # Dry run first
```

## Safety Rules

1. **Never use passwords in CLI** — use SSH keys
2. **Never commit private keys** to repos — only public keys
3. **Never hardcode production IPs** in scripts — use `~/.ssh/config` aliases
4. **Close tunnels when done** — kill background SSH processes
5. **Never forward production DB port externally** without time-limited reason
6. **Confirm before uploading files to production** — show file contents first


## References

- [Examples (Input/Output)](references/examples.md)
