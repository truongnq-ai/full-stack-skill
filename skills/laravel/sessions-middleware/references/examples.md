# Examples — Laravel Sessions & Middleware (Refined)

## Example 1 — Middleware Group

**Input**
```php
Route::get('/admin', ...);
```

**Output**
```php
Route::middleware(['auth','verified','admin'])->group(...);
```

**Why**
- Centralized access control.

---

## Example 2 — Session Driver

**Input**
```php
SESSION_DRIVER=file
```

**Output**
```php
SESSION_DRIVER=redis
```

**Why**
- Scales across instances.
