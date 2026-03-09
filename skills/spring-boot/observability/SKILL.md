---
name: Spring Boot Observability
description: Standards for Micrometer, Distributed Tracing, and Structured Logging
metadata:
  labels: [spring-boot, observability, tracing, logs]
  triggers:
    priority: medium
    confidence: 0.7
    files: ['logback-spring.xml', 'application.properties']
    keywords: [micrometer, tracing, correlation-id, mdc]
workflow_ref: deep-security-audit
---

# Spring Boot Observability

## **Priority: P0**

## Output Template

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"] # or []
next_checks: ["<check 1>"]
```

- **Summary**: <what changed / what was done>
- **Risks**: <known risks or "none">
- **Next Checks**: <tests/verification steps>

## Implementation Guidelines

### Distributed Tracing

- **Correlation IDs**: Enable trace/span ID injection.
- **Propagation**: Propagate context across threads (`@Async`) and clients.
- **OpenTelemetry**: Use OTel bridge (`micrometer-tracing-bridge-otel`).

### Structured Logging

- **Format**: Use JSON logging (`logstash-logback-encoder`) in production.
- **MDC**: Use MDC for contextual info (userId, tenantId).
- **Output**: Log to stdout only. Let container handle shipping.

### Actuator

- **Security**: Secure `/actuator/**` with Admin role.
- **Probes**: Enable K8s Liveness/Readiness probes.

## Anti-Patterns

- **System.out**: `**No System.out**: Use Slf4j.`
- **Public Actuator**: `**No Open Actuator**: Secure endpoints.`
- **Custom Tracing**: `**No DIY Tracing**: Use Micrometer.`

## References

- [Implementation Examples](references/implementation.md)


## References

- [Examples (Input/Output)](references/examples.md)
