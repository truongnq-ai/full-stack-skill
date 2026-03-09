# Examples — React Native Security

## Example 1 — Secure Storage

**Input**
```ts
await AsyncStorage.setItem('token', token);
```

**Output**
```ts
await Keychain.setGenericPassword('token', token);
```

**Why**
- Uses encrypted storage.

---

## Example 2 — Deep Link Validation

**Input**
```ts
navigate(url);
```

**Output**
```ts
if (isAllowedHost(url)) navigate(url);
```

**Why**
- Prevents malicious deep links.
