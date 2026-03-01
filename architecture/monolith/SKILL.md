# Monolith Skill

## 1) Overview & Context
Áp dụng cho hệ thống nhỏ–trung bình, team nhỏ, cần tốc độ phát triển và triển khai đơn giản.

## 2) Coding Conventions
- Module theo domain
- Giữ boundaries rõ ràng trong codebase

## 3) Project Structure (gợi ý)
- src/
  - modules/
  - common/
  - configs/

## 4) Common Patterns
- Modular monolith
- Shared services rõ ràng

## 5) Testing
- Unit test
- Integration test cho các module chính

## 6) Security & Pitfalls
- Tránh coupling quá chặt giữa module
- Tránh “big ball of mud”

## 7) CI/CD Checklist
- Lint
- Test
- Build

## 8) AI Agent Playbook
1) Kiểm tra boundary giữa module
2) Tối ưu module dependency
3) Tránh circular dependency

## 9) Do/Don’t (Anti-patterns)
- ✅ Do: phân module rõ
- ❌ Don’t: để core business rải rác
- ❌ Don’t: bỏ qua module boundaries
