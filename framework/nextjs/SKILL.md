# Next.js Skill

## 1) Overview & Context
Áp dụng cho frontend SSR/SSG, SEO, dashboard nội bộ, hoặc fullstack web app dùng React + Next.

## 2) Coding Conventions
- TypeScript mặc định
- File naming: kebab-case cho route, PascalCase cho component
- Hooks: bắt đầu bằng `use`
- Quy ước folder: `app/` (App Router) hoặc `pages/` (Page Router) — không trộn

## 3) Project Structure (gợi ý)
- app/ (hoặc pages/)
- components/
- features/
- lib/
- services/
- styles/
- public/

## 4) Common Patterns
- Data fetching: server components / route handlers
- State management: zustand/redux tùy 규모
- API layer tách riêng

## 5) Testing
- Unit: Jest + React Testing Library
- E2E: Playwright

## 6) Security & Pitfalls
- Không render dữ liệu nhạy cảm trên client
- Cẩn thận với env (server vs client)
- Validate input ở API routes

## 7) CI/CD Checklist
- Lint (eslint)
- Typecheck (tsc)
- Unit tests
- Build

## 8) AI Agent Playbook
1) Xác định router (app/pages)
2) Không trộn client/server component sai chỗ
3) Kiểm tra env exposure

## 9) Do/Don’t (Anti-patterns)
- ✅ Do: tách feature module rõ ràng
- ❌ Don’t: gọi API trực tiếp trong component mà không có layer
- ❌ Don’t: trộn CSS global thiếu kiểm soát
