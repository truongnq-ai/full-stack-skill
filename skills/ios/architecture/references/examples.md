# Examples — iOS Architecture

## Example 1 — Coordinator Navigation

**Input**
```swift
navigationController?.pushViewController(vc, animated: true)
```

**Output**
```swift
coordinator.showDetails()
```

**Why**
- Moves navigation out of VC.

---

## Example 2 — Pure ViewModel

**Input**
```swift
import UIKit
class UserVM {}
```

**Output**
```swift
import Foundation
class UserVM {}
```

**Why**
- Keeps ViewModel UI-free.
