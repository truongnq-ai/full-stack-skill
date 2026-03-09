# Examples — Flutter GetX Navigation (Refined)

## Example 1 — Named Route

**Input**
```dart
Get.to(Profile())
```

**Output**
```dart
Get.toNamed('/profile', arguments: {'id':1})
```

**Why**
- Centralized routes.

---

## Example 2 — Middleware

**Input**
```dart
// no auth check
```

**Output**
```dart
GetMiddleware(redirect: (_) => '/login')
```

**Why**
- Protected routes.
