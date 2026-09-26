---
description: "Manage OS-level administration tasks on Windows (PowerShell, WSL2, services) and Linux (systemd, cron, users, disk, network)."
---

# 🖥️ DevOps: OS & Server Administration

> **Use this workflow when**: DevOps needs to perform OS-level administration — managing services, scheduling cron jobs, configuring WSL2, managing users/permissions, monitoring disk/network, or hardening a server. Trigger: `/software-devops-os-admin`.
>
> **Out of scope**: Does not provision new infrastructure — use `/software-devops-provision-infrastructure`. Does not set up Docker — use `/software-devops-setup-infra`. Does not handle production incidents — use `/software-devops-handle-incident`.
>
> **Activates skills**: `skills/common/ssh/SKILL.md`, `skills/common/ops/SKILL.md`

---

## Step 1 — Identify OS & Task Type

```
view_file skills/common/ssh/SKILL.md
view_file skills/common/ops/SKILL.md
```

Identify platform and task:

**Linux tasks:**

| Task | Command set |
|---|---|
| Service management | `systemctl start/stop/enable/status` |
| Cron scheduling | `crontab -e`, `systemd timers` |
| User & permission | `useradd`, `chmod`, `chown`, `sudo visudo` |
| Disk & storage | `df -h`, `du -sh`, `lsblk`, `mount` |
| Network | `ip addr`, `ss -tulnp`, `ufw`, `iptables` |

**Windows tasks:**

| Task | Command set |
|---|---|
| Service management | `Get-Service`, `Start-Service`, `sc.exe` |
| Scheduled tasks | `schtasks`, `Register-ScheduledTask` |
| WSL2 management | `wsl --list`, `wsl --set-version`, `wsl --shutdown` |
| User management | `net user`, `net localgroup`, `lusrmgr` |
| PowerShell scripts | Execution policy, modules, remoting |

> **Rule (Guardrails)**: For any command that modifies user permissions, firewall rules, or system services — confirm with user before executing.

---

## Step 2 — Pre-execution Check

```bash
# Linux: check OS version and running services
uname -a && systemctl list-units --type=service --state=running | head -20

# Windows (PowerShell)
$PSVersionTable.PSVersion
Get-ComputerInfo | Select-Object OsName, OsVersion
```

> **Fallback (Linux)**: If SSH connection fails, verify with `ssh -v user@host` and check `~/.ssh/config`.
> **Fallback (Windows)**: If SSH unavailable, use WinRM: `Enter-PSSession -ComputerName <host> -Credential <user>` or enable OpenSSH: `Add-WindowsCapability -Online -Name OpenSSH.Server*`.

---

## Step 3 — Execute Administration Task

Apply least-privilege principle: always use the minimum permission necessary.

**Linux service**:
```bash
sudo systemctl status <service>
sudo systemctl enable --now <service>
journalctl -u <service> -n 50 --no-pager   # Check logs
```

**Cron job**:
```bash
crontab -l                              # List existing
# Add: "*/5 * * * * /path/to/script.sh >> /var/log/job.log 2>&1"
crontab -e
```

**Windows service**:
```powershell
Get-Service -Name <ServiceName> | Select-Object Name, Status, StartType
Set-Service -Name <ServiceName> -StartupType Automatic
Restart-Service -Name <ServiceName>
```

**WSL2**:
```powershell
wsl --list --verbose
wsl --set-default-version 2
wsl --shutdown && wsl                   # Restart WSL2
```

---

## ⏸️ Checkpoint: Before System Changes

```
"Planned system change:
- OS: [Linux / Windows]
- Action: [describe]
- Risk: [LOW / MEDIUM / HIGH]
- Rollback: [how to revert]

Proceed? (Y / N)"
```

---

## Step 4 — Verify & Document

```bash
# Verify service running
systemctl is-active <service>

# Verify cron registered
crontab -l | grep <script>
```

Save summary to `docs/ops/admin-log-$(date +%Y%m%d).md`:
- Task performed, commands run, result, any issues.

---

## Done Criteria

- [ ] OS platform confirmed before executing commands
- [ ] User confirmed HIGH-risk changes before execution
- [ ] System state verified post-change
- [ ] Admin log saved to `docs/ops/`

> **Required Skill**: `skills/common/ops/SKILL.md`
