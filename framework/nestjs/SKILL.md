# NestJS Skill

## 1) Overview & Context
Áp dụng cho backend Node.js quy mô vừa–lớn, kiến trúc module rõ ràng, DI mạnh.

## 2) Coding Conventions
- TypeScript strict
- Module theo feature
- Controller mỏng, logic ở service
- DTO + validation (class-validator)

## 3) Project Structure (gợi ý)
- src/
  - modules/
    - <feature>/
      - controller.ts
      - service.ts
      - dto/
      - entity/
  - common/
  - config/

## 4) Common Patterns
- Dependency Injection
- Interceptors/Guards/Filters
- DTO mapping

## 5) Testing
- Unit: Jest
- E2E: Supertest

## 6) Security & Pitfalls
- Validate input
- Cẩn thận với exception filter
- Không expose env client-side

## 7) CI/CD Checklist
- Lint + typecheck
- Unit tests
- Build

## 8) AI Agent Playbook
1) Xác định module boundaries
2) Ensure validation + guard
3) Check error handling flow

## 9) Do/Don’t (Anti-patterns)
- ✅ Do: dùng module theo domain
- ❌ Don’t: viết business logic trong controller
- ❌ Don’t: bỏ qua DTO validation
