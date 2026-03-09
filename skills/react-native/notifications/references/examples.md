# Examples — React Native Notifications (Refined)

## Example 1 — Permission

**Input**
```ts
// no permission request
```

**Output**
```ts
await messaging().requestPermission()
```

**Why**
- Required for push.

---

## Example 2 — Token

**Input**
```ts
// no FCM token
```

**Output**
```ts
const token = await messaging().getToken()
```

**Why**
- Enables targeting device.
