# Template: Monorepo

## 1) Overview & Context
Dùng khi nhiều package/app chia sẻ codebase chung.

## 2) Coding Conventions
- Workspace manager (pnpm/yarn/npm)
- Naming package rõ ràng

## 3) Project Structure (gợi ý)
- apps/
- packages/
- tools/
- configs/

## 4) Common Patterns
- Shared libs
- Versioning theo workspace

## 5) Testing
- Lint/test per package
- CI theo affected changes

## 6) Security & Pitfalls
- Tránh dependency cycles
- Quản lý quyền truy cập package

## 7) CI/CD Checklist
- Lint → Test → Build → Deploy

## 8) AI Agent Playbook
1) Xác định package boundaries
2) Tránh circular dependency
3) Chạy test cho affected apps

## 9) Do/Don’t (Anti-patterns)
- ✅ Do: sử dụng workspace tools
- ❌ Don’t: lẫn logic giữa apps/packages
- ❌ Don’t: bỏ qua versioning
