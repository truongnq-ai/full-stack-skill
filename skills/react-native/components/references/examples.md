# Examples — React Native Components (Refined)

## Example 1 — Extract Component

**Input**
```tsx
// 300-line render
```

**Output**
```tsx
const Header = () => ...
```

**Why**
- Improves readability.

---

## Example 2 — Memo

**Input**
```tsx
const Row = ({item}) => <View />
```

**Output**
```tsx
const Row = React.memo(({item}) => <View />)
```

**Why**
- Reduces re-renders.
