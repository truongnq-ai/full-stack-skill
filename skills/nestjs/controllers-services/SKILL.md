---
name: NestJS Controllers & Services
description: Controller/Service separation and Custom Decorators.
metadata:
  labels:
    - nestjs
    - controller
    - service
    - controllers-services
  triggers:
    priority: medium
    confidence: 0.7
    files:
      - '**/*.controller.ts'
      - '**/*.service.ts'
    keywords:
      - Controller
      - Injectable
      - ExecutionContext
      - createParamDecorator
workflow_ref: update-docs
---

# NestJS Controllers & Services Standards

## **Priority: P0 (FOUNDATIONAL)**

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

Layer separation standards and dependency injection patterns for NestJS applications.

## Controllers

- **Role**: Handler only. Delegate **all** logic to Services.
- **Context**: Use `ExecutionContext` helpers (`switchToHttp()`) for platform-agnostic code.
- **Custom Decorators**:
  - **Avoid**: `@Request() req` -> `req.user` (Not type-safe).
  - **Pattern**: Create typed decorators like `@CurrentUser()`, `@DeviceIp()`.

  ```typescript
  import { RequestWithUser } from 'src/common/interfaces/request.interface';

  export const CurrentUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): User => {
      const request = ctx.switchToHttp().getRequest<RequestWithUser>();
      return request.user;
    },
  );
  ```

## DTOs & Validation

- **Strictness**:
  - `whitelist: true`: Strip properties without decorators.
  - **Critical**: `forbidNonWhitelisted: true`: Throw error if unknown properties exist.
- **Transformation**:
  - `transform: true`: Auto-convert primitives (String '1' -> Number 1) and instantiate DTO classes.
- **Documentation**:
  - **Automation**: Use the `@nestjs/swagger` CLI plugin (`nest-cli.json`) to auto-detect DTO properties without manual `@ApiProperty()` tags.

## Interceptors (Response Mapping)

- **Standardization**: specific responses should be mapped in **Interceptors**, not Controllers.
  - Use `map()` to wrap success responses (e.g. `{ data: T }`).
  - Refer to **[API Standards](../api-standards/SKILL.md)** for `PageDto` and `ApiResponse`.
  - Use `catchError()` to map low-level errors (DB constraints) to `HttpException` (e.g. `ConflictException`) _before_ they hit the global filter.

## Services & Business Logic

- **Singleton**: Default.
- **Stateless**: Do not store request-specific state in class properties unless identifying as `Scope.REQUEST`.
## References
- [Examples (Input/Output)](references/examples.md)
- [Notes](references/notes.md)

