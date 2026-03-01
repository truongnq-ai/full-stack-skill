# JS/TS Skill

## 1) Overview & Context
Áp dụng cho frontend/backed Node.js, tooling, hoặc fullstack apps.

## 2) Coding Conventions
- TypeScript strict (ưu tiên TS)
- Naming:
  - function/variable: camelCase
  - class/interface: PascalCase
  - file: kebab-case
- Lint: eslint + prettier

## 3) Project Structure (gợi ý)
- src/
  - modules/
  - services/
  - utils/
- tests/

## 4) Common Patterns
- Service layer
- DTO/Schema validation (zod/joi)
- Error handling middleware

## 5) Testing
- Unit: Jest/Vitest
- Integration: Supertest (backend)

## 6) Security & Pitfalls
- Không dùng any tràn lan
- Không log secrets
- Validate input ở boundary

## 7) CI/CD Checklist
- Lint + typecheck
- Unit tests
- Build

## 8) AI Agent Playbook
1) Ensure TS strict
2) Apply lint/format
3) Add tests cho core logic

## 9) Do/Don’t (Anti-patterns)
- ✅ Do: type-safe DTO
- ❌ Don’t: bỏ qua typecheck
- ❌ Don’t: dùng any vô tội vạ
