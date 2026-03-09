# Examples — JavaScript Language

## Example 1 — Async/Await

**Input**
```js
fetch(url).then(r => r.json())
```

**Output**
```js
const res = await fetch(url);
const data = await res.json();
```

**Why**
- Clearer async flow.

---

## Example 2 — Nullish Coalescing

**Input**
```js
const v = value || 'default'
```

**Output**
```js
const v = value ?? 'default'
```

**Why**
- Keeps falsy values like 0.
