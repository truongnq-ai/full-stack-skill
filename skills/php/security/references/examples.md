# Examples — PHP Security

## Example 1 — Prepared Statements

**Input**
```php
$db->query("SELECT * FROM users WHERE id = $id");
```

**Output**
```php
$stmt = $db->prepare("SELECT * FROM users WHERE id = ?");
$stmt->execute([$id]);
```

**Why**
- Prevents SQL injection.

---

## Example 2 — Password Hash

**Input**
```php
$hash = md5($password);
```

**Output**
```php
$hash = password_hash($password, PASSWORD_BCRYPT);
```

**Why**
- Uses strong hashing.
