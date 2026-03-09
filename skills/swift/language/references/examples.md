# Examples — Swift Language

## Example 1 — Struct vs Class

**Input**
```swift
class Point { var x: Int; var y: Int }
```

**Output**
```swift
struct Point { var x: Int; var y: Int }
```

**Why**
- Value semantics by default.

---

## Example 2 — Result Type

**Input**
```swift
func load() -> Data? { ... }
```

**Output**
```swift
func load() -> Result<Data, Error> { ... }
```

**Why**
- Explicit error handling.
