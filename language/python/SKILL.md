# Python Skill

## 1) Overview & Context
Áp dụng cho backend, automation, data service hoặc tooling nội bộ.

## 2) Coding Conventions
- PEP8, black, isort
- Naming:
  - module/function: snake_case
  - class: PascalCase
  - constant: UPPER_SNAKE_CASE
- Type hints cho các hàm quan trọng

## 3) Project Structure (gợi ý)
- src/
  - app/
    - api/
    - services/
    - repositories/
    - models/
    - schemas/
    - utils/
- tests/

## 4) Common Patterns
- Service/Repository
- Settings management via env
- Validation bằng Pydantic

## 5) Testing
- pytest
- coverage + fixtures

## 6) Security & Pitfalls
- Không hardcode secret
- Validate input
- Cẩn trọng với dynamic import/eval

## 7) CI/CD Checklist
- Lint (ruff/flake8)
- Format (black)
- Unit tests
- Security scan (bandit)

## 8) AI Agent Playbook
1) Verify structure
2) Apply lint/format
3) Add tests cho use case chính

## 9) Do/Don’t (Anti-patterns)
- ✅ Do: dùng virtual env, pin dependencies
- ❌ Don’t: bỏ qua type hints cho core logic
- ❌ Don’t: log thông tin nhạy cảm
