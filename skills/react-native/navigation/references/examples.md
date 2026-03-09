# Examples — React Native Navigation (Refined)

## Example 1 — Typed Params

**Input**
```ts
navigation.navigate('Profile', { id: 1 })
```

**Output**
```ts
navigation.navigate('Profile', { userId: '1' })
```

**Why**
- Matches typed route params.

---

## Example 2 — Linking Config

**Input**
```ts
// no linking config
```

**Output**
```ts
linking: { prefixes: ['myapp://'], config: { screens: {...} } }
```

**Why**
- Enables deep links.
