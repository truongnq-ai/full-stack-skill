# Examples — Python Security

## Example 1 — Parameterized SQL

**Input**
```python
cursor.execute(f"SELECT * FROM users WHERE id = {user_id}")
```

**Output**
```python
cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
```

**Why**
- Prevents SQL injection.

---

## Example 2 — Pydantic Validation

**Input**
```python
user = UserCreate(**payload)
```

**Output**
```python
user = UserCreate.model_validate(payload)
```

**Why**
- Validates and forbids extra fields.
