# Examples — React Performance

## Example 1 — Memoize Heavy Component

**Input**
```tsx
export function Chart({ data }) {
  return <HeavyChart data={data} />;
}
```

**Output**
```tsx
export const Chart = React.memo(function Chart({ data }) {
  return <HeavyChart data={data} />;
});
```

**Why**
- Prevents re-render when props are stable.

---

## Example 2 — Split Large Bundle

**Input**
```tsx
import AdminPanel from './AdminPanel';
```

**Output**
```tsx
const AdminPanel = React.lazy(() => import('./AdminPanel'));
```

**Why**
- Loads heavy code only when needed.
