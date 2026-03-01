# Angular Skill

## 1) Overview & Context
Áp dụng cho enterprise frontend, dashboard lớn, yêu cầu kiến trúc rõ ràng, testable.

## 2) Coding Conventions
- TypeScript strict
- Naming:
  - Component: `FeatureXComponent`
  - Service: `FeatureXService`
  - File: `feature-x.component.ts`
- Module rõ ràng, tránh module quá lớn

## 3) Project Structure (gợi ý)
- src/app/
  - core/ (singleton services, guards)
  - shared/ (shared components)
  - features/
  - app-routing.module.ts

## 4) Common Patterns
- Smart/Dumb component pattern
- RxJS best practices
- Lazy loading modules

## 5) Testing
- Unit: Jest hoặc Karma
- E2E: Cypress/Playwright

## 6) Security & Pitfalls
- Tránh subscribe mà không unsubscribe
- Cẩn thận với XSS trong template

## 7) CI/CD Checklist
- Lint
- Test
- Build

## 8) AI Agent Playbook
1) Check module boundaries
2) Verify RxJS subscription cleanup
3) Avoid direct DOM manipulation

## 9) Do/Don’t (Anti-patterns)
- ✅ Do: dùng async pipe
- ❌ Don’t: lạm dụng any
- ❌ Don’t: viết logic quá nặng trong component
