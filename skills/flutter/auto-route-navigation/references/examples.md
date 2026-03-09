# Examples — Flutter AutoRoute (Refined)

## Example 1 — Generated Routes

**Input**
```dart
Navigator.push(...)
```

**Output**
```dart
context.router.push(ProfileRoute(id: 1))
```

**Why**
- Typed navigation.

---

## Example 2 — Guards

**Input**
```dart
// no auth guard
```

**Output**
```dart
@AutoRoute(guards: [AuthGuard])
```

**Why**
- Access control.
