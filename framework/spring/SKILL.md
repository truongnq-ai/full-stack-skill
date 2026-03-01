# Spring Skill

## 1) Overview & Context
Áp dụng cho backend enterprise, microservice/monolith, yêu cầu ổn định và mở rộng tốt.

## 2) Coding Conventions
- Package theo domain: `com.company.project.<feature>`
- Controller mỏng, logic ở Service
- DTO tách request/response
- Validation bằng Bean Validation

## 3) Project Structure (gợi ý)
- src/main/java/com.company.project/
  - config/
  - controller/
  - service/
  - repository/
  - domain/
  - dto/
  - exception/
- src/test/java/

## 4) Common Patterns
- Layered architecture
- Global exception handler
- MapStruct cho mapping

## 5) Testing
- Unit: JUnit5 + Mockito
- Integration: Testcontainers (DB)

## 6) Security & Pitfalls
- Không log PII/secret
- Validate input sớm
- Cấu hình CORS rõ ràng

## 7) CI/CD Checklist
- Lint/style
- Unit tests
- SAST/dependency scan
- Build

## 8) AI Agent Playbook
1) Check controller/service separation
2) Verify DTO mapping
3) Ensure validation + exception flow

## 9) Do/Don’t (Anti-patterns)
- ✅ Do: dùng service layer đúng nghĩa
- ❌ Don’t: đặt business logic trong controller
- ❌ Don’t: lạm dụng static util
