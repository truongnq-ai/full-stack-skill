# Examples — iOS App Lifecycle (Refined)

## Example 1 — Scene Delegate

**Input**
```swift
// app setup in view controller
```

**Output**
```swift
// setup in SceneDelegate/Scene
```

**Why**
- Correct lifecycle handling.

---

## Example 2 — Background Task

**Input**
```swift
// no background handling
```

**Output**
```swift
beginBackgroundTask(withName:)
```

**Why**
- Finishes work on background.
