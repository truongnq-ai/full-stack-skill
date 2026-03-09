# Examples — React Native Deployment (Refined)

## Example 1 — CodePush

**Input**
```ts
// no OTA updates
```

**Output**
```ts
codePush.sync({ installMode: codePush.InstallMode.ON_NEXT_RESTART })
```

**Why**
- Controlled OTA delivery.

---

## Example 2 — Versioning

**Input**
```text
version 1.0
```

**Output**
```text
versionCode/buildNumber incremented per release
```

**Why**
- Required by stores.
