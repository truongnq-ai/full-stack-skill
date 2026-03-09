# Examples — Laravel Eloquent (Refined)

## Example 1 — N+1 Fix

**Input**
```php
$users = User::all(); // later $user->posts
```

**Output**
```php
$users = User::with('posts')->get();
```

**Why**
- Prevents N+1 queries.

---

## Example 2 — Scope

**Input**
```php
User::where('status','active')->where('plan','pro')
```

**Output**
```php
User::active()->pro();
```

**Why**
- Reusable query logic.
