# Docker Conventions (Detail)

## Dockerfile
- Base image slim
- Tách build stage và runtime

## Tagging
- app:1.2.3
- app:1.2.3-<gitsha>

## Runtime
- USER non-root
- Healthcheck nếu cần
