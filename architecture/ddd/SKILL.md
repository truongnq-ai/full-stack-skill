# DDD Skill

## 1) Overview & Context
Áp dụng khi domain phức tạp, nhiều rule nghiệp vụ, cần ngôn ngữ chung giữa business và tech.

## 2) Coding Conventions
- Ubiquitous Language thống nhất naming
- Model domain giàu hành vi (rich domain model)

## 3) Project Structure (gợi ý)
- domain/ (entities, value objects, aggregates)
- application/ (use cases)
- infrastructure/ (db, messaging)
- interface/ (API)

## 4) Common Patterns
- Aggregate, Entity, Value Object
- Domain Service
- Repository interface

## 5) Testing
- Unit test domain logic
- Integration test repository

## 6) Security & Pitfalls
- Tránh anemic domain model
- Không để domain phụ thuộc framework

## 7) CI/CD Checklist
- Lint
- Unit tests
- Build

## 8) AI Agent Playbook
1) Xác định bounded context
2) Thiết kế aggregates
3) Tách use case rõ ràng

## 9) Do/Don’t (Anti-patterns)
- ✅ Do: tập trung model hóa domain
- ❌ Don’t: biến domain thành DTO thuần
- ❌ Don’t: để infrastructure lấn át domain
