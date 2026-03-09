# Examples — React State Management (Refined)

## Example 1 — Local State

**Input**
```tsx
// global store for form
```

**Output**
```tsx
const [form, setForm] = useState(...)
```

**Why**
- Avoids unnecessary global state.

---

## Example 2 — Context Split

**Input**
```tsx
const Ctx = createContext({state, setState})
```

**Output**
```tsx
const StateCtx = createContext(state); const DispatchCtx = createContext(dispatch);
```

**Why**
- Reduces re-renders.
