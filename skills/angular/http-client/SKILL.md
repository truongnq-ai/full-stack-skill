---
name: HTTP Client
description: Best practices for HttpClient, Interceptors, and API interactions.
metadata:
  labels: [angular, http, api, interceptors]
  triggers:
    files: ['**/*.service.ts', '**/*.interceptor.ts']
    keywords: [HttpClient, HttpInterceptorFn, withInterceptors]
workflow_ref: smart-release
---

# HTTP Client

## **Priority: P1 (HIGH)**

## Output Template

- **Summary**: <what changed / what was done>
- **Risks**: <known risks or "none">
- **Next Checks**: <tests/verification steps>

## Principles

- **Functional Interceptors**: Use `HttpInterceptorFn`. Class-based interceptors are deprecated.
- **Typed Responses**: Always type `http.get<User[]>()`.
- **Services**: Encapsulate all HTTP calls in Services. Never call `http` in Components.

## Guidelines

- **Caching**: Implement caching in interceptors or using `shareReplay(1)` in services.
- **Error Handling**: Catch errors in services or global interceptors, not components.
- **Context**: Use `HttpContext` to pass metadata to interceptors (e.g., specific caching rules).

## References

- [Interceptors](references/interceptors.md)


## References

- [Examples (Input/Output)](references/examples.md)
