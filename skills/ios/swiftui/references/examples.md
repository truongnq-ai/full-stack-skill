# Examples — SwiftUI (Refined)

## Example 1 — State

**Input**
```swift
var count = 0
```

**Output**
```swift
@State private var count = 0
```

**Why**
- State-driven UI updates.

---

## Example 2 — ObservableObject

**Input**
```swift
class VM {}
```

**Output**
```swift
class VM: ObservableObject { @Published var name = "" }
```

**Why**
- Reactive updates.
