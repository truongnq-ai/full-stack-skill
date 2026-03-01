# Clean Architecture Skill

## 1) Overview & Context
Áp dụng để tách biệt core business logic khỏi framework/infrastructure.

## 2) Coding Conventions
- Dependency rule: code trong core không phụ thuộc outer layers
- Naming theo use case

## 3) Project Structure (gợi ý)
- entities/
- usecases/
- interfaces/
- infrastructure/

## 4) Common Patterns
- Use Case Interactor
- Interface Adapters

## 5) Testing
- Unit test cho use case
- Mock external dependencies

## 6) Security & Pitfalls
- Tránh over-engineering
- Không để framework ăn sâu core

## 7) CI/CD Checklist
- Lint
- Unit tests
- Build

## 8) AI Agent Playbook
1) Xác định boundary
2) Tách interface adapters
3) Đảm bảo dependency rule

## 9) Do/Don’t (Anti-patterns)
- ✅ Do: giữ core sạch
- ❌ Don’t: để framework phụ thuộc vào core
- ❌ Don’t: mix responsibilities
