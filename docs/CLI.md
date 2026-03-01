# CLI Usage (Note)

CLI sẽ được build theo Node ESM, tương tự `global-skill` (bin/cli.js).

## Commands (planned)
- tech-stack-skill init
- tech-stack-skill install

## Install location
Tất cả skill sẽ được copy vào: `.agent/skills/`

## Interactive options (planned)
- language: java/python/js-ts/go/csharp
- framework: spring/django/nestjs/react/nextjs/angular
- architecture: ddd/hexagonal/clean/microservices/monolith
- infra: docker/k8s/cicd/observability
- templates: api-service/worker/monorepo/mobile

> Lưu ý: CLI implementation sẽ được viết riêng theo chuẩn global-skill, dùng Node ESM + copyDir.
