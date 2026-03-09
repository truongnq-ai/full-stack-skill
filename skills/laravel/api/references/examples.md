# Examples — Laravel API (Refined)

## Example 1 — Resource Wrapper

**Input**
```php
return $user;
```

**Output**
```php
return new UserResource($user);
```

**Why**
- Standardizes API output.

---

## Example 2 — Pagination

**Input**
```php
return User::all();
```

**Output**
```php
return User::paginate(20);
```

**Why**
- Avoids huge responses.
