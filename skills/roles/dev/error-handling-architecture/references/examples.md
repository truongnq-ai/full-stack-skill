# Examples — Error Handling Architecture

## Example 1 — Custom Error Hierarchy (TypeScript/Node.js)

**Scenario**: E-commerce API needs consistent error handling across 50+ endpoints.

**Implementation**:
```typescript
// src/errors/AppError.ts
export class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly httpStatus: number,
    public readonly isOperational: boolean = true,
    public readonly details?: Record<string, unknown>
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

// src/errors/domain/OrderErrors.ts
export class OrderNotFoundError extends AppError {
  constructor(orderId: string) {
    super(`Order '${orderId}' not found`, 'ORDER_NOT_FOUND', 404);
  }
}

export class InsufficientStockError extends AppError {
  constructor(productId: string, requested: number, available: number) {
    super(
      `Product '${productId}' has insufficient stock`,
      'INSUFFICIENT_STOCK', 409, true,
      { productId, requested, available }
    );
  }
}
```

**Why**: Typed errors enable precise catch handling, meaningful API responses, and clear monitoring alerts.

---

## Example 2 — Global Error Handler (Express)

**Scenario**: All unhandled errors must produce consistent JSON responses.

```typescript
// src/middleware/errorHandler.ts
export function globalErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  const correlationId = req.headers['x-correlation-id'] || crypto.randomUUID();

  if (err instanceof AppError && err.isOperational) {
    logger.warn('Operational error', { code: err.code, correlationId, path: req.path });
    return res.status(err.httpStatus).json({
      error: { code: err.code, message: err.message, details: err.details, correlationId }
    });
  }

  // Programmer error — hide details, log everything
  logger.error('Unexpected error', { error: err.message, stack: err.stack, correlationId });
  return res.status(500).json({
    error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred', correlationId }
  });
}
```

**Why**: Centralizes error formatting, prevents stack trace leaks, and adds correlation IDs for debugging.

---

## Example 3 — Graceful Degradation

**Scenario**: Product page shows recommendations, but the recommendation service is down.

```typescript
async function getProductPage(productId: string) {
  const product = await productService.getById(productId); // Critical — throw on failure

  let recommendations = [];
  try {
    recommendations = await recommendationService.getForProduct(productId);
  } catch (err) {
    logger.warn('Recommendation service unavailable, degrading gracefully', { productId });
    recommendations = await productService.getPopular(5); // Fallback to popular items
  }

  return { product, recommendations };
}
```

**Why**: Non-critical dependency failures should degrade the experience, not crash the entire page.
