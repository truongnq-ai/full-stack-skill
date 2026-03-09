# Examples — React Native Performance (Refined)

## Example 1 — FlatList

**Input**
```tsx
items.map(renderItem)
```

**Output**
```tsx
<FlatList data={items} renderItem={renderItem} />
```

**Why**
- Virtualized list rendering.

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
