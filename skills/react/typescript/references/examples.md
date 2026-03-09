# Examples — React TypeScript (Refined)

## Example 1 — Props Type

**Input**
```tsx
function Button(props) { ... }
```

**Output**
```tsx
type ButtonProps = { onClick: () => void };
function Button({ onClick }: ButtonProps) { ... }
```

**Why**
- Strongly typed props.

---

## Example 2 — Union State

**Input**
```tsx
const [state, setState] = useState('idle');
```

**Output**
```tsx
type State = 'idle'|'loading'|'error';
const [state, setState] = useState<State>('idle');
```

**Why**
- Prevents invalid states.
