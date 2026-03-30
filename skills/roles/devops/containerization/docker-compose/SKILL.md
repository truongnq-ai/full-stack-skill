---
name: Docker Compose Standardization
description: Best practices for structuring multi-container local development and lightweight staging environments using Docker Compose.
category: roles/devops
metadata:
  labels: [devops, docker, containers, local-dev, environment]
  triggers:
    priority: high
    confidence: 0.95
    keywords: [docker-compose, docker compose, local environment, setup containers]
---

# 🐳 Docker Compose Standardization

> **Use this skill when**: a developer needs a single command (`docker-compose up`) to spin up the Database, Redis, Web App, and Worker cleanly on their local machine. Trigger: `/devops-docker-compose`.
>
> **Out of scope**: This is NOT for orchestrating Production loads across a fleet of servers (Use Kubernetes or ECS).

---

## 🚫 Anti-Patterns

- **Hard-Coded Secrets**: Placing `POSTGRES_PASSWORD=supersecret` directly in `docker-compose.yml` instead of interpolating an `.env` file.
- **Port Collisions**: Binding default ports indiscriminately (`ports: ["5432:5432"]`) without realizing a developer might already have Postgres running locally.
- **Missing Volumes**: Neglecting DB volume mounts, causing the entire database to wipe clean every time `docker-compose down` is run.

---

## 🛠 Prerequisites & Tooling

1. Docker Desktop or Docker Engine installed locally.
2. The project's microservices or dependencies mapped out (e.g., App -> Postgres -> Redis).

---

## 🔄 Execution Workflow

### Step 1 — Basic Structure & Versioning
Always specify the modern Compose format (no version number required in latest specs, but historically `version: '3.8'`).
Create `docker-compose.yml` in the project root.

### Step 2 — Service Definition & Dependency Mapping
List services with clear namespaces.
Define startup dependency chains using `depends_on`.
```yaml
services:
  db:
    image: postgres:15-alpine
    restart: unless-stopped
    # ...
  
  api:
    build:
      context: .
      target: development # Use multi-stage docker builds
    depends_on:
      db:
        condition: service_healthy # Wait for DB to be actually ready, not just up
```

### Step 3 — Environment Interpolation
Never commit `.env` to Git. Reference it explicitly in Compose.
```yaml
    env_file:
      - .env
```
Ensure a `.env.example` file is provided in the repository with safe defaults so the project works out-of-the-box.

### Step 4 — Persistent Storage (Volumes)
Mount named volumes for databases to preserve data across container restarts.
```yaml
  db:
    volumes:
      - postgres_data:/var/lib/postgresql/data
      
volumes:
  postgres_data:
```

### Step 5 — Health Checks
Containers starting quickly doesn't mean they are ready to accept traffic. Define explicit health checks.
```yaml
  db:
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER}"]
      interval: 5s
      timeout: 5s
      retries: 5
```

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| Slow Startups | Heavy Node.js builds take too long via Compose | Use `volumes: ["./src:/app/src"]` to map the highly changing source code to the container, enabling Hot-Module Reloading (HMR) without rebuilding the image. |
| Production Parity | Developer complains DB works locally but fails on staging | Confirm the local `docker-compose.yml` uses the *exact same* Docker image tags (e.g. `postgres:15.3`) as the staging environment, preventing minor-version disparities. |

---

## ✅ Done Criteria / Verification

A standard local development environment is complete when:

- [ ] A new developer can literally run `docker compose up -d` on a fresh clone and have a working app in < 3 minutes.
- [ ] Database data naturally persists if the containers are torn down and rebuilt.
- [ ] API services do not crash-loop on startup because they accurately wait for the DB's `service_healthy` flag.
