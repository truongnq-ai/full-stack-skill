# Examples — iOS Deployment (Refined)

## Example 1 — Build Config

**Input**
```swift
// hardcoded API URL
```

**Output**
```swift
// use xcconfig per environment
```

**Why**
- Environment-specific config.

---

## Example 2 — Code Signing

**Input**
```text
manual profiles
```

**Output**
```text
automatic signing + CI provisioning
```

**Why**
- Reliable releases.
