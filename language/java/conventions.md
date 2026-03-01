# Java Conventions (Detail)

## Code Style
- Google Java Style Guide
- Line length 100–120
- Use final cho biến bất biến

## Naming
- Class/Interface: `OrderService`, `UserRepository`
- Method: `calculatePrice()`
- Boolean method: `isValid()`, `hasItems()`

## Error Handling
- Custom exception theo domain
- Global exception handler map -> error response chuẩn

## Logging
- Log level chuẩn: INFO cho business flow, ERROR cho exception
- Không log token/secret/PII

## Dependency
- Pin version rõ ràng
- Tránh trùng thư viện logging
