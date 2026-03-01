# Template: API Service

## 1) Overview & Context
Dùng cho backend service cung cấp REST/gRPC API.

## 2) Coding Conventions
- Controller mỏng, service dày
- DTO rõ ràng
- Validation bắt buộc

## 3) Project Structure (gợi ý)
- src/
  - controllers/
  - services/
  - repositories/
  - dtos/
  - config/
- tests/

## 4) Common Patterns
- Global error handler
- Versioning API

## 5) Testing
- Unit + integration
- Contract tests (nếu cần)

## 6) Security & Pitfalls
- Authn/Authz rõ ràng
- Rate limiting

## 7) CI/CD Checklist
- Lint → Test → Build → Deploy

## 8) AI Agent Playbook
1) Xác định API contract
2) Validate input
3) Viết test cho endpoints chính

## 9) Do/Don’t (Anti-patterns)
- ✅ Do: tách layer rõ
- ❌ Don’t: logic trong controller
- ❌ Don’t: bỏ qua validation
