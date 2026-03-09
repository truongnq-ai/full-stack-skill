# Examples — Flutter Riverpod (Refined)

## Example 1 — Provider

**Input**
```dart
final counter = StateProvider((_) => 0);
```

**Output**
```dart
final counter = StateProvider<int>((ref) => 0);
```

**Why**
- Explicit types.

---

## Example 2 — AutoDispose

**Input**
```dart
final repoProvider = Provider((ref) => Repo());
```

**Output**
```dart
final repoProvider = Provider.autoDispose((ref) => Repo());
```

**Why**
- Releases resources when unused.
