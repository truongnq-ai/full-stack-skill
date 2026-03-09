# Examples — Python Tooling

## Example 1 — uv add

**Input**
```sh
pip install fastapi
```

**Output**
```sh
uv add fastapi
```

**Why**
- Keeps pyproject + lock in sync.

---

## Example 2 — ruff

**Input**
```sh
black . && isort .
```

**Output**
```sh
ruff format .
```

**Why**
- Single tool for formatting.
