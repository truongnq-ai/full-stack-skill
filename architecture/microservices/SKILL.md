# Microservices Skill

## 1) Overview & Context
Áp dụng khi hệ thống lớn, nhiều team song song, cần scale theo domain và triển khai độc lập.

## 2) Coding Conventions
- Service ownership rõ ràng theo domain
- API contract rõ ràng (OpenAPI)
- Versioning API

## 3) Project Structure (gợi ý)
- services/<service-name>/
  - src/
  - tests/
  - Dockerfile
  - helm/ (nếu có)

## 4) Common Patterns
- API Gateway
- Service discovery
- Circuit breaker
- Event-driven (Kafka/RabbitMQ)

## 5) Testing
- Unit + integration test
- Contract test (consumer-driven)

## 6) Security & Pitfalls
- Không chia DB giữa services
- Tránh chatty communication
- Observability bắt buộc (trace + metrics)

## 7) CI/CD Checklist
- Build per service
- Deploy independent
- Canary/blue-green

## 8) AI Agent Playbook
1) Xác định bounded context
2) Định nghĩa API contract
3) Thiết kế communication strategy (sync/async)

## 9) Do/Don’t (Anti-patterns)
- ✅ Do: tách service theo domain
- ❌ Don’t: chia service theo layer kỹ thuật
- ❌ Don’t: dùng shared database
