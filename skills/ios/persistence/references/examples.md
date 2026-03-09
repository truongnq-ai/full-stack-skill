# Examples — iOS Persistence (Refined)

## Example 1 — Keychain

**Input**
```swift
UserDefaults.standard.set(token, forKey: "token")
```

**Output**
```swift
Keychain.save("token", value: token)
```

**Why**
- Secure storage.

---

## Example 2 — CoreData

**Input**
```swift
// manual JSON file storage
```

**Output**
```swift
// use CoreData with NSManagedObject
```

**Why**
- Structured persistence.
