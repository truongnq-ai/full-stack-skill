# Observability Skill

## 1) Overview & Context
Theo dõi hệ thống qua logs, metrics, traces để phát hiện và xử lý sự cố nhanh.

## 2) Coding Conventions
- Structured logging
- Trace ID xuyên suốt request
- Metric naming chuẩn

## 3) Project Structure (gợi ý)
- observability/
  - logging/
  - metrics/
  - tracing/

## 4) Common Patterns
- Centralized logging (ELK/Loki)
- Metrics (Prometheus/Grafana)
- Tracing (Jaeger/Tempo)

## 5) Testing
- Kiểm tra log format
- Validate metrics endpoint

## 6) Security & Pitfalls
- Không log PII/secret
- Sampling trace hợp lý

## 7) CI/CD Checklist
- Log/metrics setup check
- Alert rules validation

## 8) AI Agent Playbook
1) Verify log structure
2) Ensure trace propagation
3) Check alert thresholds

## 9) Do/Don’t (Anti-patterns)
- ✅ Do: chuẩn hóa log
- ❌ Don’t: log dữ liệu nhạy cảm
- ❌ Don’t: thiếu alert cho critical path
