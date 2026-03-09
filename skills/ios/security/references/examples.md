# Examples — iOS Security

## Example 1 — Keychain vs UserDefaults

**Input**
```swift
UserDefaults.standard.set(token, forKey: "token")
```

**Output**
```swift
Keychain.save("token", value: token)
```

**Why**
- Secure storage for secrets.

---

## Example 2 — File Protection

**Input**
```swift
try data.write(to: url)
```

**Output**
```swift
try data.write(to: url, options: .completeFileProtection)
```

**Why**
- Encrypts file at rest.
