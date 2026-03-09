# Examples — Next.js Architecture

## Example 1 — Feature Slices

**Input**
```text
components/ hooks/ utils/
```

**Output**
```text
features/user/ features/order/
```

**Why**
- Groups by feature.

---

## Example 2 — RSC Boundary

**Input**
```tsx
// Client component fetching DB
```

**Output**
```tsx
// Server component fetches, passes DTO
```

**Why**
- Keeps server data on server.
