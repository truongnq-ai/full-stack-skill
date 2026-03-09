# Examples — iOS Networking (Refined)

## Example 1 — URLSession

**Input**
```swift
URLSession.shared.dataTask(...)
```

**Output**
```swift
let request = URLRequest(url: url); session.data(for: request)
```

**Why**
- Modern async/await.

---

## Example 2 — Retry

**Input**
```swift
// no retry
```

**Output**
```swift
retry(2) { api.call() }
```

**Why**
- Handles transient failures.
