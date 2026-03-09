# Examples — Laravel Architecture (Refined)

## Example 1 — Thin Controller

**Input**
```php
public function store(Request $r){ User::create($r->all()); }
```

**Output**
```php
public function store(StoreUserRequest $r){ return $this->service->store($r->validated()); }
```

**Why**
- Keeps business logic in service layer.

---

## Example 2 — DTO Mapping

**Input**
```php
return $user;
```

**Output**
```php
return new UserResource($user);
```

**Why**
- Prevents leaking entity internals.
