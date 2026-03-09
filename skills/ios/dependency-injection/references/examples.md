# Examples — iOS Dependency Injection (Refined)

## Example 1 — Constructor Injection

**Input**
```swift
class VM { let api = Api() }
```

**Output**
```swift
class VM { init(api: Api) { ... } }
```

**Why**
- Testable and decoupled.

---

## Example 2 — Resolver

**Input**
```swift
// manual wiring everywhere
```

**Output**
```swift
resolver.register(Api.self) { Api() }
```

**Why**
- Centralized DI.
