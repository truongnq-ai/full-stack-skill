# Examples — Redis (Refined)

## Example 1 — SCAN

**Input**
```sh
KEYS user:*
```

**Output**
```sh
SCAN 0 MATCH user:* COUNT 100
```

**Why**
- Avoids blocking Redis.

---

## Example 2 — TTL

**Input**
```sh
SET session:123 "..."
```

**Output**
```sh
SET session:123 "..." EX 3600
```

**Why**
- Prevents unbounded growth.
