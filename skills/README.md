# Skills Registry

This registry provides domain skills for AI agents. Use categories to compose an install.

## Categories
- common
- roles (ba, qa, devops, writer, reviewer)
- frontend (alias → react, nextjs, angular)
- backend (alias → nestjs, spring-boot, golang, laravel, java)
- mobile (alias → android, ios, flutter, react-native, swift)
- data (alias → database)
- platform (alias → roles/devops)

## Role Presets
Use `full-stack-skill init` to select a role preset.
Available roles: BA, QA, DevOps, Writer, Reviewer.

## Stack Presets
- stack:web → frontend + backend + common
- stack:backend → backend + database + common
- stack:frontend → frontend + common
- stack:mobile → mobile + common
- stack:data → data + common
- stack:platform → platform + common

## Example .skillsrc (presets-first)
```yaml
registry: https://github.com/truongnq-ai/full-stack-skill
agents: [cursor, copilot]
presets:
  - role:qa
  - stack:web
```

## Example .skillsrc (explicit categories)
```yaml
registry: https://github.com/truongnq-ai/full-stack-skill
agents: [cursor]
skills:
  common: { ref: common-v1.5.4 }
  roles: { ref: roles-v1.0.0, include: [qa] }
  frontend: { ref: frontend-v0.1.0 }
  backend: { ref: backend-v0.1.0 }
```
