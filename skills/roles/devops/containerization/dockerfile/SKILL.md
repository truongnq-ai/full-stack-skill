---
name: Dockerfile Standardization
description: Structural and security best practices for writing optimized, secure, and minimal Dockerfiles for Production environments.
category: roles/devops
metadata:
  labels: [devops, docker, dockerfile, container-build, optimization]
  triggers:
    priority: critical
    confidence: 0.95
    keywords: [dockerfile, build image, optimize container, reduce image size]
---

# 📦 Dockerfile Standardization

> **Use this skill when**: you need to containerize an application by writing or refactoring a `Dockerfile`. Trigger: `/devops-write-dockerfile`.
>
> **Out of scope**: Handling runtime orchestration like Kubernetes manifests or Compose files. This governs only the Image Build process.

---

## 🚫 Anti-Patterns

- **Running as Root**: Leaving `USER root` as the default in production, allowing a container-escape vulnerability to compromise the host node.
- **The "Latest" Tag**: `FROM node:latest` guarantees your build will randomly break six months from now when Node 20 updates to Node 22.
- **Fat Images**: Copying the entire `node_modules` and raw source code into the production image, resulting in a 2GB container instead of a 100MB one.
- **Leaking Build Secrets**: Doing `COPY .env .` or `RUN git clone https://TOKEN@github.com` leaving keys readable in the Docker image history.

---

## 🛠 Prerequisites & Tooling

1. Access to the project's source code and build requirements.
2. An understanding of Multi-Stage Builds in Docker.

---

## 🔄 Execution Workflow

### Step 1 — Base Image Selection
Always use Alpine or "slim" Debian images. Pin the specific version.
`FROM node:20.10.0-alpine AS builder`

### Step 2 — The Build Stage (Multi-Stage Builds)
Create an ephemeral builder stage to compile the code.
```dockerfile
# Stage 1: Build
FROM node:20.10.0-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
```

### Step 3 — The Production Stage
Create a pristine, lightweight runner stage. Copy ONLY the compiled artifacts from the Builder.
```dockerfile
# Stage 2: Production Runner
FROM node:20.10.0-alpine AS runner
WORKDIR /app
# Only copy the prod dependencies and compiled dist
COPY package*.json ./
RUN npm ci --omit=dev  
COPY --from=builder /app/dist ./dist
```

### Step 4 — Security & User Scoping
Never run the final process as root.
Ensure the container listens on an unprivileged port (e.g., usually > 1024, like 3000).
```dockerfile
# Create a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
EXPOSE 3000
```

### Step 5 — The Entrypoint
Use explicit `CMD` or `ENTRYPOINT` syntax (JSON array format) to ensure proper signal handling (SIGTERM) allows graceful shutdowns.
```dockerfile
CMD ["node", "dist/main.js"]
```

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| Large Build Context | Building takes 20 minutes because it's uploading 1GB of local logs | Create a `.dockerignore` file. Immediately exclude `node_modules`, `.git`, `.env`, and local `/logs/` directories. |
| Missing C Libraries | The Alpine image fails to run a Python or Node C-binding | Fallback to a Debian Slim image (`node:20.10.0-bullseye-slim`). It is slightly larger but includes necessary glibc binaries natively. |

---

## ✅ Done Criteria / Verification

A standard Dockerfile is complete when:

- [ ] It utilizes Multi-Stage builds (if the language requires compilation/transpilation).
- [ ] The base image is explicitly pinned to a major/minor version tag, avoiding `:latest`.
- [ ] The final process executes under a non-root `USER`.
- [ ] A `.dockerignore` file exists alongside it.
