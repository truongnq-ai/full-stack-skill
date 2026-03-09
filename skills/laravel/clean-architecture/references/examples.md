# Examples — Laravel Clean Architecture (Refined)

## Example 1 — Use Case Layer

**Input**
```php
Controller -> Model directly
```

**Output**
```php
Controller -> UseCase -> Repository
```

**Why**
- Clear separation of concerns.

---

## Example 2 — DTO Input

**Input**
```php
$request->all()
```

**Output**
```php
new CreateUserDto($request->validated())
```

**Why**
- Explicit contract.
