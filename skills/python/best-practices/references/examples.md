# Examples — Python Best Practices

## Example 1 — Thin Routes

**Input**
```python
@router.post('/users')
async def create_user(payload: dict):
    user = await repo.create(payload)
    return user
```

**Output**
```python
@router.post('/users')
async def create_user(payload: UserCreate):
    return await user_service.create(payload)
```

**Why**
- Routes are adapters; logic in services.

---

## Example 2 — Django N+1 Fix

**Input**
```python
qs = Order.objects.all()
```

**Output**
```python
qs = Order.objects.select_related('user')
```

**Why**
- Prevents N+1 queries.
