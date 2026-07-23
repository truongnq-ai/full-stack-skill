---
name: Error Handling Architecture
description: Standards for designing consistent error hierarchies, global handlers, structured error responses, and graceful degradation across the application stack.
category: roles/dev
metadata:
  labels: [dev, error-handling, exceptions, error-boundary, resilience]
  triggers:
    priority: high
    confidence: 0.95
    keywords: [error handling, exception architecture, error boundary, global error handler, custom exceptions]
    file_patterns: ["**/errors/**", "**/exceptions/**", "**/middleware/error*", "**/error-handler*"]
    context: ["user asks how to handle errors", "user encounters unhandled exceptions", "user asks about error response format"]
    negative: ["user asks about production debugging", "user asks about incident response"]
---

# 🚨 Error Handling Architecture

> **Use this skill when**: designing or refactoring how an application handles errors — from custom exception classes through global handlers to structured API error responses. Trigger: `/dev-error-arch`.
>
> **Out of scope**: Debugging specific production errors (`production-debugging/SKILL.md`). Infrastructure-level resilience (circuit breakers, retries at the load balancer) belongs to `roles/devops/`. This governs the *application-layer error design system*.

---

## 🚫 Anti-Patterns

- **The Pokémon Handler**: `catch (error) { /* ignore */ }` — Catching every exception and swallowing it silently. The system appears healthy while silently losing data, dropping transactions, or corrupting state.
- **String-Based Error Checking**: `if (error.message.includes('not found'))` — Fragile pattern that breaks when the error message wording changes. Use typed error classes or error codes instead.
- **Stack Trace Leaking to Users**: Returning `{ error: "TypeError: Cannot read property 'email' of undefined at UserService.ts:42" }` to the API consumer. Internal implementation details leak to potential attackers.
- **HTTP 200 Everything**: Returning `200 OK` with body `{ success: false, error: "User not found" }`. This breaks standard HTTP clients, monitoring tools, and API contracts.
- **The God Catch**: One massive `try/catch` wrapping the entire request handler. When it catches, you have no idea which of the 15 operations inside actually failed.

---

## 🛠 Prerequisites & Tooling

1. Understanding of the language's exception/error model (JavaScript Error, Python Exception, Go error values).
2. HTTP semantics for API error responses.
3. A structured logging library (Winston, Pino, structlog).

---

## 🔄 Execution Workflow

### Step 1 — Design the Error Hierarchy

Create a layered exception class system:

```typescript
// Base application error — all custom errors extend this
export class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string,       // Machine-readable: 'USER_NOT_FOUND'
    public readonly httpStatus: number,  // HTTP mapping: 404
    public readonly isOperational: boolean = true  // true = expected, false = programmer bug
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

// Domain-specific errors
export class NotFoundError extends AppError {
  constructor(resource: string, id: string) {
    super(`${resource} with id '${id}' not found`, 'RESOURCE_NOT_FOUND', 404);
  }
}

export class ValidationError extends AppError {
  constructor(public readonly fields: Record<string, string>) {
    super('Validation failed', 'VALIDATION_ERROR', 400);
  }
}

export class AuthorizationError extends AppError {
  constructor(action: string, resource: string) {
    super(`Not authorized to ${action} on ${resource}`, 'FORBIDDEN', 403);
  }
}
```

**Key Principle**: Operational errors (expected: user not found, validation failed) vs Programmer errors (unexpected: null pointer, type mismatch). Only operational errors get structured responses; programmer errors get generic 500s and are logged for debugging.

### Step 2 — Implement the Global Error Handler

Create a centralized error handler middleware that catches ALL unhandled errors:

```typescript
// Express example
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError && err.isOperational) {
    // Expected error — structured response
    logger.warn('Operational error', { code: err.code, path: req.path });
    return res.status(err.httpStatus).json({
      error: { code: err.code, message: err.message }
    });
  }
  
  // Unexpected error — log full details, return generic response
  logger.error('Unexpected error', { error: err, stack: err.stack, path: req.path });
  return res.status(500).json({
    error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' }
  });
});
```

**Rules**:
- NEVER expose stack traces, file paths, or internal variable names to the client.
- ALWAYS log the full error details (stack, request context, user ID) server-side.
- Use correlation IDs to link client-facing error codes to server-side log entries.

### Step 3 — Standardize API Error Response Format

Define a consistent JSON error envelope used across ALL endpoints:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      { "field": "email", "message": "Invalid email format" },
      { "field": "age", "message": "Must be a positive integer" }
    ],
    "correlationId": "req-abc-123"
  }
}
```

Document this format in the API contract (`api-contract/SKILL.md`).

### Step 4 — Frontend Error Boundaries (React/Mobile)

For client-side applications:
- Implement React Error Boundaries to catch rendering errors without crashing the entire app.
- Display user-friendly fallback UI (not white screens).
- Report errors to a monitoring service (Sentry, Datadog RUM).

### Step 5 — Graceful Degradation Strategy

When a non-critical dependency fails (e.g., recommendation engine, analytics service):
- Log the error.
- Return a degraded but functional response (e.g., show popular items instead of personalized recommendations).
- Do NOT crash the entire request because a secondary feature failed.

> **⏸️ Checkpoint**:
> "Error handling architecture đã thiết kế xong: [N] custom error classes, global handler, structured response format. Bạn có muốn tôi implement không? (Y/N)"

---

## 🛠️ Tooling & Execution

- **Create Error Classes**: Use `write_to_file` to create `src/errors/` directory with typed error classes.
- **Search Existing Patterns**: Use `grep_search` to find current error handling patterns (`catch`, `try`, `throw`).
- **Find Anti-Patterns**: Use `grep_search` → `catch.*{}` or `catch.*ignore` to find swallowed errors.
- **Verify Handler**: Use `run_command` → `npm test` to run tests against error scenarios.
- **Check HTTP Codes**: Use `grep_search` → `res.status(200)` near error conditions.

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| Legacy Codebase | Hundreds of `try/catch` blocks with inconsistent error handling | Do NOT refactor all at once. Add the global handler first. Then incrementally migrate individual catch blocks to throw typed `AppError` instances, starting with the highest-traffic endpoints. |
| Third-Party Library Errors | External library throws generic `Error` objects without codes | Wrap the library call in an adapter that catches its errors and re-throws them as your typed `AppError` classes. This is the Anti-Corruption Layer pattern. |
| Async/Unhandled Rejections | Promise rejections go unhandled, crashing the Node.js process | Register `process.on('unhandledRejection')` and `process.on('uncaughtException')` handlers to log and gracefully shutdown instead of silently dying. |

---

## ✅ Done Criteria / Verification

Error handling architecture is production-ready when:

- [ ] A typed error hierarchy exists (base `AppError` + domain-specific subclasses).
- [ ] A global error handler catches ALL unhandled errors and returns structured responses.
- [ ] Stack traces and internal details are NEVER exposed in API responses.
- [ ] All API error responses follow a consistent JSON envelope format.
- [ ] Correlation IDs link client-facing error codes to server-side log entries.

---

## 📚 Cross-References

- `roles/dev/api-contract/SKILL.md` — Error response format must be part of the API contract.
- `roles/dev/security-basics/SKILL.md` — Stack trace leaking is a security vulnerability.
- `roles/dev/production-debugging/SKILL.md` — Structured errors make production debugging faster.
- `roles/dev/unit-test-best-practices/SKILL.md` — Test edge cases and error paths, not just happy paths.
