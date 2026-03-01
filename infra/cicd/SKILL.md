# CI/CD Skill

## 1) Overview & Context
Tự động hóa build/test/deploy để giảm lỗi thủ công.

## 2) Coding Conventions
- Pipeline chia stage rõ ràng
- Secrets quản lý qua vault/secret store

## 3) Project Structure (gợi ý)
- .github/workflows/
- .gitlab-ci.yml
- ci/ (scripts)

## 4) Common Patterns
- Lint → Test → Build → Deploy
- Parallel jobs
- Cache dependencies

## 5) Testing
- Unit + integration
- Smoke test sau deploy

## 6) Security & Pitfalls
- Không log secret
- Pin phiên bản actions

## 7) CI/CD Checklist
- Lint
- Test
- Build
- Deploy + rollback

## 8) AI Agent Playbook
1) Check pipeline stages
2) Validate secrets usage
3) Ensure rollback strategy

## 9) Do/Don’t (Anti-patterns)
- ✅ Do: cache dependency
- ❌ Don’t: auto deploy không kiểm soát
- ❌ Don’t: hardcode token
