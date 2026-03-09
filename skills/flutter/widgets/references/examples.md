# Examples — Flutter Widgets (Refined)

## Example 1 — Extract Widget

**Input**
```dart
// 300-line build method
```

**Output**
```dart
class _Header extends StatelessWidget { ... }
```

**Why**
- Improves readability.

---

## Example 2 — Keys

**Input**
```dart
ListView(children: widgets)
```

**Output**
```dart
ListView(children: widgets.map((w)=>KeyedSubtree(key: ValueKey(id), child:w)))
```

**Why**
- Stable element identity.
