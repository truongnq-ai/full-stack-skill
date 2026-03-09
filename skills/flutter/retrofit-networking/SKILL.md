---
name: Flutter Networking (Retrofit & Dio)
description: HTTP networking standards using Dio and Retrofit with Auth interceptors.
metadata:
  labels:
    - networking
    - retrofit
    - dio
    - flutter
    - retrofit-networking
  triggers:
    priority: medium
    confidence: 0.7
    files:
      - '**/data_sources/**'
      - '**/api/**'
    keywords:
      - Retrofit
      - Dio
      - RestClient
      - GET
      - POST
      - Interceptor
      - refreshing
workflow_ref: ui-ux-pro-max
---

# Retrofit & Dio Networking

## **Priority: P0 (CRITICAL)**

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

Type-safe REST API communication using `Dio` and `Retrofit`.

## Structure

```text
infrastructure/
├── data_sources/
│   ├── remote/ # Retrofit abstract classes
│   └── local/ # Cache/Storage
└── network/
    ├── dio_client.dart # Custom Dio setup
    └── interceptors/ # Auth, Logging, Cache
```

## Implementation Guidelines

- **Retrofit Clients**: Define abstract classes with `@RestApi()`. Use standard HTTP annotations (`@GET`, `@POST`).
- **DTOs (Data Transfer Objects)**: Use `@freezed` and `json_serializable` for all response/request bodies.
- **Mapping**: Data sources MUST map DTOs to Domain Entities (e.g., `userDto.toDomain()`).
- **Safe Enums**: Always use `@JsonKey(unknownEnumValue: ...)` for DTO enums to prevent crashes when the backend introduces new values.
- **AuthInterceptor**: Logic for `Authorization: Bearer <token>` injection in `onRequest`.
- **Token Refresh**: Handle `401 Unauthorized` in `onError` by locking Dio, refreshing, and retrying.
- **Failures**: Map `DioException` to custom `Failure` objects (ServerFailure, NetworkFailure).

## Anti-Patterns

- **No Manual JSON Parsing**: Do not use `jsonDecode(response.body)`; use Retrofit's generated mappers.
- **No Global Dio**: Do not use a static global Dio instance; use dependency injection.
- **No Try-Catch in API**: Do not put `try-catch` inside the Retrofit interface methods.
- **No Unsafe Enums**: Do not leave enums in DTOs without handling unknown values from the server.

## Reference & Examples

For RestClient definitions and Auth Interceptor implementation:
See [references/REFERENCE.md](references/REFERENCE.md).

## Related Topics

feature-based-clean-architecture | error-handling


## References

- [Examples (Input/Output)](references/examples.md)
