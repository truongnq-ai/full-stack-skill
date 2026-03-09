# Examples — Laravel Security (Refined)

## Example 1 — Form Request

**Input**
```php
User::create($request->all());
```

**Output**
```php
$data = $request->validated(); User::create($data);
```

**Why**
- Prevents mass assignment.

---

## Example 2 — Gate/Policy

**Input**
```php
return $post->delete();
```

**Output**
```php
$this->authorize('delete', $post); return $post->delete();
```

**Why**
- Enforces authorization.
