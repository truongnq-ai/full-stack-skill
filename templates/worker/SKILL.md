# Template: Worker

## 1) Overview & Context
Dùng cho background job, async processing, queue consumer.

## 2) Coding Conventions
- Job idempotent
- Retry policy rõ ràng

## 3) Project Structure (gợi ý)
- src/
  - jobs/
  - handlers/
  - config/
- tests/

## 4) Common Patterns
- Retry with backoff
- Dead-letter queue

## 5) Testing
- Unit test job handler
- Integration test queue

## 6) Security & Pitfalls
- Validate payload
- Không xử lý job quá lâu

## 7) CI/CD Checklist
- Lint → Test → Build → Deploy

## 8) AI Agent Playbook
1) Xác định job type
2) Thiết kế retry/timeout
3) Viết test cho handler

## 9) Do/Don’t (Anti-patterns)
- ✅ Do: idempotent jobs
- ❌ Don’t: retry vô hạn
- ❌ Don’t: xử lý đồng bộ quá nặng
