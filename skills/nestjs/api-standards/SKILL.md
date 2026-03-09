---
name: NestJS API Standards
description: Response wrapping, pagination, and error standardization.
metadata:
  labels: [nestjs, api, pagination, response]
  triggers:
    priority: medium
    confidence: 0.7
    files: ['**/*.controller.ts', '**/*.dto.ts']
    keywords: [ApiResponse, Pagination, TransformInterceptor]
workflow_ref: update-docs
---

# NestJS API Standards & Common Patterns

## **Priority: P1 (OPERATIONAL)**

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

Standardized API response patterns and common NestJS conventions.

## Generic Response Wrapper

- **Concept**: Standardize all successful API responses.
- **Implementation**: Use `TransformInterceptor` to wrap data in `{ statusCode, data, meta }`.

## Pagination Standards (Pro)

- **DTOs**: Use strict `PageOptionsDto` (page/take/order) and `PageDto<T>` (data/meta).
- **Swagger Logic**: Generics require `ApiExtraModels` and schema path resolution.
- **Reference**: See [Pagination Wrapper Implementation](references/pagination-wrapper.md) for the complete `ApiPaginatedResponse` decorator code.

## Custom Error Response

- **Standard Error Object**:

  ```typescript
  export class ApiErrorResponse {
    @ApiProperty()
    statusCode: number;

    @ApiProperty()
    message: string;

    @ApiProperty()
    error: string;

    @ApiProperty()
    timestamp: string;

    @ApiProperty()
    path: string;
  }
  ```

- **Docs**: Apply `@ApiBadRequestResponse({ type: ApiErrorResponse })` globally or per controller.


## References

- [Examples (Input/Output)](references/examples.md)
