# Examples — iOS UI Navigation (Refined)

## Example 1 — Coordinator

**Input**
```swift
navigationController?.pushViewController(vc, animated: true)
```

**Output**
```swift
coordinator.showDetails()
```

**Why**
- Decouples navigation.

---

## Example 2 — Modal Flow

**Input**
```swift
present(vc, animated: true)
```

**Output**
```swift
coordinator.presentModal()
```

**Why**
- Centralized flow control.
