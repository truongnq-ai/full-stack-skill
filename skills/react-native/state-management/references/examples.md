# Examples — React Native State (Refined)

## Example 1 — Local State

**Input**
```tsx
// global store for modal
```

**Output**
```tsx
const [open, setOpen] = useState(false)
```

**Why**
- Avoids unnecessary global state.

---

## Example 2 — Zustand

**Input**
```tsx
// prop drilling deep
```

**Output**
```tsx
const useStore = create(set => ({ count:0, inc:()=>set(s=>({count:s.count+1})) }))
```

**Why**
- Simple shared state.
