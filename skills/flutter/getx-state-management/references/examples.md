# Examples — Flutter GetX State (Refined)

## Example 1 — Reactive var

**Input**
```dart
var count = 0
```

**Output**
```dart
var count = 0.obs
```

**Why**
- Reactive updates.

---

## Example 2 — Controller

**Input**
```dart
class C {}
```

**Output**
```dart
class C extends GetxController { ... }
```

**Why**
- Lifecycle-aware state.
