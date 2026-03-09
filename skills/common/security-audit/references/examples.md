# Examples — Security Audit (Refined)

## Example 1 — Secret in Code

**Input**
```ts
const API_KEY = "sk_live_...";
```

**Output**
"Flag as critical. Move to env/secret manager; rotate key."

**Why**
- Prevents credential leakage.

---

## Example 2 — Injection Risk

**Input**
```ts
const q = `SELECT * FROM users WHERE id = ${id}`;
```

**Output**
"Flag as blocker. Use parameterized query with placeholders."

**Why**
- Eliminates SQL injection.
