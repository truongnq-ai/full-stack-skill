# Spring Conventions (Detail)

## Structure
- controller/: REST endpoints
- service/: business logic
- repository/: data access
- domain/: entities/aggregates
- dto/: request/response

## Validation
- @Valid + Bean Validation annotations
- Custom validator khi cần

## Exception
- @ControllerAdvice + standardized error response

## Logging
- SLF4J + MDC
- Không log dữ liệu nhạy cảm
