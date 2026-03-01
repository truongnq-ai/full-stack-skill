# Template: Mobile

## 1) Overview & Context
Dùng cho mobile app (native hoặc cross-platform).

## 2) Coding Conventions
- Module theo feature
- State management rõ ràng

## 3) Project Structure (gợi ý)
- src/
  - features/
  - shared/
  - services/

## 4) Common Patterns
- Offline support (nếu cần)
- API client tách layer

## 5) Testing
- Unit tests
- UI tests (nếu có)

## 6) Security & Pitfalls
- Bảo vệ token
- Không lưu secret trong app

## 7) CI/CD Checklist
- Lint → Test → Build → Release

## 8) AI Agent Playbook
1) Xác định feature modules
2) Thiết kế state management
3) Viết tests cho critical flows

## 9) Do/Don’t (Anti-patterns)
- ✅ Do: tách API layer
- ❌ Don’t: hardcode secret
- ❌ Don’t: state tràn lan
