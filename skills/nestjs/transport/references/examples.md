# Examples — NestJS Transport (Refined)

## Example 1 — Microservice Client

**Input**
```ts
// http call to internal service
```

**Output**
```ts
client.send('user.created', payload)
```

**Why**
- Uses message-based transport.

---

## Example 2 — Timeout

**Input**
```ts
client.send('cmd', data)
```

**Output**
```ts
client.send('cmd', data).pipe(timeout(3000))
```

**Why**
- Prevents hanging calls.
