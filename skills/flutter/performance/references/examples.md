# Examples — Flutter Performance (Refined)

## Example 1 — const Widgets

**Input**
```dart
Widget build() => Text('Hello');
```

**Output**
```dart
Widget build() => const Text('Hello');
```

**Why**
- Reduces rebuild cost.

---

## Example 2 — RepaintBoundary

**Input**
```dart
// large widget tree jank
```

**Output**
```dart
RepaintBoundary(child: HeavyWidget())
```

**Why**
- Isolates repaint.
