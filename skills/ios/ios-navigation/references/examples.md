# Examples — iOS Navigation (Refined)

## Example 1 — Deep Link

**Input**
```swift
// parse URL in VC
```

**Output**
```swift
router.handle(url)
```

**Why**
- Centralized routing.

---

## Example 2 — Tab Flow

**Input**
```swift
UITabBarController setup in VC
```

**Output**
```swift
TabCoordinator sets up tabs
```

**Why**
- Consistent flow setup.
