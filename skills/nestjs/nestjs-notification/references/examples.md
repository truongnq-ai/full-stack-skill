# Examples — NestJS Notification (Refined)

## Example 1 — Channel Fanout

**Input**
```ts
sendEmail(user, msg)
```

**Output**
```ts
notify(user, { email: true, push: true })
```

**Why**
- Supports multi-channel delivery.

---

## Example 2 — Template

**Input**
```ts
send('Welcome ' + name)
```

**Output**
```ts
sendTemplate('welcome', { name })
```

**Why**
- Consistent messaging.
