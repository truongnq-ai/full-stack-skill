# Python Conventions (Detail)

## Code Style
- black, line length 88/100
- isort chuẩn hóa imports

## Naming
- function: `calculate_price()`
- class: `OrderService`
- constant: `MAX_RETRY`

## Error Handling
- Raise domain-specific exceptions
- Return error object/HTTP errors rõ ràng

## Logging
- Use structlog or standard logging
- Không log secrets/token

## Dependency
- requirements.txt hoặc poetry.lock
- Pin version rõ ràng
