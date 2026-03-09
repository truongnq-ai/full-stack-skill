# Examples — iOS Notifications (Refined)

## Example 1 — Permission

**Input**
```swift
// no permission request
```

**Output**
```swift
UNUserNotificationCenter.current().requestAuthorization(...)
```

**Why**
- Required for notifications.

---

## Example 2 — Category Actions

**Input**
```swift
// no actions
```

**Output**
```swift
UNNotificationCategory(identifier: "reply", actions: [replyAction])
```

**Why**
- Interactive notifications.
