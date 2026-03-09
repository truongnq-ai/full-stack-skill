# Examples — iOS Localization (Refined)

## Example 1 — Localized String

**Input**
```swift
label.text = "Hello"
```

**Output**
```swift
label.text = NSLocalizedString("hello", comment: "")
```

**Why**
- Enables translations.

---

## Example 2 — Plurals

**Input**
```swift
"%d items"
```

**Output**
```swift
String.localizedStringWithFormat(NSLocalizedString("items", comment:""), count)
```

**Why**
- Correct pluralization.
