# Hexagonal Architecture Skill

## 1) Overview & Context
Áp dụng để tách core business khỏi adapter (DB, API, external systems).

## 2) Coding Conventions
- Core không phụ thuộc adapter
- Port (interface) đặt trong core

## 3) Project Structure (gợi ý)
- core/
  - ports/
  - domain/
- adapters/
  - inbound/
  - outbound/

## 4) Common Patterns
- Ports & Adapters
- Inbound/Outbound adapters

## 5) Testing
- Unit test core
- Integration test adapter

## 6) Security & Pitfalls
- Tránh adapter lẫn vào core
- Đảm bảo port rõ ràng

## 7) CI/CD Checklist
- Lint
- Unit tests
- Build

## 8) AI Agent Playbook
1) Xác định ports
2) Tách inbound/outbound adapters
3) Kiểm tra dependency direction

## 9) Do/Don’t (Anti-patterns)
- ✅ Do: core độc lập
- ❌ Don’t: để adapter truy cập trực tiếp domain nội bộ
- ❌ Don’t: thiếu port abstraction
