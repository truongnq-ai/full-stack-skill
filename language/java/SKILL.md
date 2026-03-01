# Java Skill

## 1) Overview & Context
Áp dụng cho backend enterprise (microservice/monolith) với yêu cầu ổn định, rõ ràng, dễ maintain.

## 2) Coding Conventions
- Style: Google Java Style (hoặc checkstyle tương đương)
- Naming:
  - Class/Interface: PascalCase
  - Method/Variable: lowerCamelCase
  - Constant: UPPER_SNAKE_CASE
- Package: theo domain, tránh package chung chung (util/common quá rộng)
- Null-safety: ưu tiên Optional hoặc validation rõ ràng

## 3) Project Structure (gợi ý)
- src/main/java
  - com.company.project
    - config/
    - controller/
    - service/
    - repository/
    - domain/
    - dto/
    - exception/
- src/test/java

## 4) Common Patterns
- Service/Repository pattern
- DTO mapping rõ ràng (MapStruct hoặc manual, tránh logic rơi vào controller)
- Exception handling theo tầng (global exception handler)

## 5) Testing
- Unit test: JUnit5 + Mockito
- Integration test: Testcontainers (nếu cần DB)
- Coverage mục tiêu: 70–80% tùy module

## 6) Security & Pitfalls
- Không log PII hoặc secret
- Validate input (controller) + sanitize output
- Tránh sử dụng reflection tùy tiện

## 7) CI/CD Checklist
- Lint/style
- Unit test
- SAST/Dependency scan
- Build artifact

## 8) AI Agent Playbook
1) Xác nhận cấu trúc module
2) Áp dụng naming + style thống nhất
3) Kiểm tra exception flow
4) Viết test tối thiểu trước khi merge

## 9) Do/Don’t (Anti-patterns)
- ✅ Do: dùng DTO riêng, validate input sớm
- ❌ Don’t: để logic nghiệp vụ trong Controller
- ❌ Don’t: lạm dụng static util cho mọi thứ
