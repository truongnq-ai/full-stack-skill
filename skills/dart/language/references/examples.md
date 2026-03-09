# Examples — Dart Language

## Example 1 — Records

**Input**
```dart
Map<String, dynamic> user = {"id": 1, "name": "A"};
```

**Output**
```dart
final (int id, String name) user = (1, "A");
```

**Why**
- Stronger typing and clarity.

---

## Example 2 — Sealed Classes

**Input**
```dart
abstract class Result {}
```

**Output**
```dart
sealed class Result {}
```

**Why**
- Constrains subtype hierarchy.
