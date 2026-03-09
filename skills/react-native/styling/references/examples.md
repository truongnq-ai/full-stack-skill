# Examples — React Native Styling (Refined)

## Example 1 — StyleSheet

**Input**
```tsx
<View style={{ padding: 12 }} />
```

**Output**
```tsx
const styles = StyleSheet.create({ box: { padding: 12 } });
```

**Why**
- Avoids inline object re-creation.

---

## Example 2 — Theming

**Input**
```tsx
const color = '#fff';
```

**Output**
```tsx
const color = theme.colors.surface;
```

**Why**
- Consistent design system.
