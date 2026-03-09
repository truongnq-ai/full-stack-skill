# Examples — Flutter GoRouter (Refined)

## Example 1 — Named Route

**Input**
```dart
context.go('/profile/1')
```

**Output**
```dart
context.goNamed('profile', pathParameters: {'id':'1'})
```

**Why**
- Type-safe routing.

---

## Example 2 — Redirect

**Input**
```dart
// no auth redirect
```

**Output**
```dart
redirect: (ctx, state) => isAuthed ? null : '/login'
```

**Why**
- Protected routes.
