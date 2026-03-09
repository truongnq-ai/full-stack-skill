# Examples — JavaScript Best Practices (Refined)

## Example 1 — Pure Functions

**Input**
```js
arr.push(x); return arr;
```

**Output**
```js
return [...arr, x];
```

**Why**
- Avoids side effects.

---

## Example 2 — Error Handling

**Input**
```js
fetch(url)
```

**Output**
```js
try { await fetch(url) } catch (e) { ... }
```

**Why**
- Handles failures explicitly.
