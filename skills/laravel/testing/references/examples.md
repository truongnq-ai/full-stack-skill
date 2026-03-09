# Examples — Laravel Testing (Refined)

## Example 1 — Feature Test

**Input**
```php
// manual testing
```

**Output**
```php
$this->post('/login', [...])->assertStatus(302);
```

**Why**
- Automates critical flows.

---

## Example 2 — Refresh DB

**Input**
```php
use DatabaseMigrations;
```

**Output**
```php
use RefreshDatabase;
```

**Why**
- Clean state each test.
