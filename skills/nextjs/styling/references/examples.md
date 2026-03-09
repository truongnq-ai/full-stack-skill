# Examples — Next.js Styling (Refined)

## Example 1 — CSS Modules

**Input**
```tsx
<div className="btn" />
```

**Output**
```tsx
<div className={styles.btn} />
```

**Why**
- Scoped styles.

---

## Example 2 — Global CSS

**Input**
```tsx
import './globals.css'
```

**Output**
```tsx
// import only in app/layout.tsx
```

**Why**
- Single global import.
