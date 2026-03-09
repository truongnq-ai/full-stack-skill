# Examples — React Native Platform Specific (Refined)

## Example 1 — Platform Select

**Input**
```tsx
const padding = 10
```

**Output**
```tsx
const padding = Platform.select({ ios: 12, android: 10 })
```

**Why**
- Handles platform differences.

---

## Example 2 — File Extensions

**Input**
```tsx
Button.tsx
```

**Output**
```tsx
Button.ios.tsx / Button.android.tsx
```

**Why**
- Per-platform components.
