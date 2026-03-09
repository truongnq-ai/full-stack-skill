# Examples — Python Language

## Example 1 — Type Hints

**Input**
```python
def get_user(id):
    return repo.find(id)
```

**Output**
```python
def get_user(id: int) -> User:
    return repo.find(id)
```

**Why**
- Improves static analysis and clarity.

---

## Example 2 — TaskGroup

**Input**
```python
results = await asyncio.gather(a(), b())
```

**Output**
```python
async with asyncio.TaskGroup() as tg:
    tg.create_task(a())
    tg.create_task(b())
```

**Why**
- Structured concurrency, better error handling.
