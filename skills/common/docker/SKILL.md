---
name: Docker Safe Operations
description: Safe Docker container management — never delete volumes without backup, always distinguish dev from production.
metadata:
  labels: [docker, devops, safety]
  triggers:
    priority: medium
    confidence: 0.7
    keywords: [docker, docker-compose, container, image, volume]
    files: ['Dockerfile', 'docker-compose*.yml', '.dockerignore']
workflow_ref: ui-ux-pro-max
---

# Docker — Safe Container Management

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

Manage containers, images, and volumes with control. Never delete production volumes without backup. Always know which environment you're in.

## Safe Commands (read-only)

```bash
docker ps / docker-compose ps      # Running containers
docker logs <c> --tail 100 -f      # Logs
docker stats --no-stream            # Resources
docker network ls / inspect         # Networks
docker volume ls / inspect          # Volumes
docker images / inspect             # Images
```

## State-Changing Commands — NEED CONFIRMATION

```bash
docker-compose restart <service>     # Confirm if production
docker-compose stop/rm <service>     # Keeps volumes
docker-compose down                  # CONFIRM on prod
docker-compose down -v               # ⚠️ NEVER on prod without backup
docker-compose build / up --build    # Safe on dev
docker system prune -f               # DEV ONLY
docker volume prune -f               # ⚠️ DANGEROUS — deletes unused volumes
```

## Safety Rules

1. **Identify environment first** — ask "local or production?" if unclear
2. **Never `docker-compose down -v` on production** — loses database data
3. **Before `docker system prune`** → check for important volumes
4. **Never pull new images on production** without staging test first
5. **Backup DB volume before long downtime**:

```bash
docker exec <pg> pg_dump -U <user> <db> > backup_$(date +%Y%m%d).sql
```

## Debug

```bash
docker exec -it <container> bash     # Shell into running container
docker exec <container> env | grep <key>  # Check env vars
docker run --rm -it <image> bash     # Temp container for debugging
```


## References

- [Examples (Input/Output)](references/examples.md)
