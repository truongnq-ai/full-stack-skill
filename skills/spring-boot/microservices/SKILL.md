---
name: Spring Boot Microservices
description: Standards for synchronous (Feign) and asynchronous (Cloud Stream) communication
metadata:
  labels: [spring-boot, microservices, feign, kafka]
  triggers:
    priority: medium
    confidence: 0.7
    files: ['**/*Client.java', '**/*Consumer.java']
    keywords: [feign-client, spring-cloud-stream, rabbitmq, resilience4j]
workflow_ref: smart-release
---

# Spring Boot Microservices Standards

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

### Sync Communication (REST)

- **Clients**: Use **Spring Cloud OpenFeign** or **Http Interfaces** (Spring 6).
- **Resilience**: Wrap calls with **Resilience4j** (Circuit Breaker).
- **Contracts**: Define DTOs in a **Shared Library** (Maven BOM).
- **Versioning**: Enforce **Semantic Versioning** on shared libs.

### Async Communication (Event-Driven)

- **Cloud Stream**: Use `java.util.function.Consumer<T>` composition.
- **Idempotency**: Consumers MUST handle duplicates (DB constraints).
- **Evolution**: Add fields only. Never rename/remove used fields.

## Anti-Patterns

- **Direct DB Access**: `**No Shared DB**: Use APIs/Events.`
- **Coupled Entities**: `**No Shared Entities**: Use DTOs.`
- **Dist. Monolith**: `**No Sync Chains**: Use Async.`

## References

- [Implementation Examples](references/implementation.md)


## References

- [Examples (Input/Output)](references/examples.md)
