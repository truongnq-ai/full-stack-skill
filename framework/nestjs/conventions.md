# NestJS Conventions (Detail)

## Structure
- modules/<feature>/ for domain
- common/ for shared components
- config/ for env config

## Validation
- class-validator + class-transformer
- Use ValidationPipe globally

## Error Handling
- Exception filters
- Standardized error response

## Logging
- Use nest logger or pino
- Avoid logging sensitive data
