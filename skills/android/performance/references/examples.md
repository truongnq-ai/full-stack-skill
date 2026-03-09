# Examples — Android Performance (Refined)

## Example 1 — Lazy List

**Input**
```kotlin
Column { items.forEach { ... } }
```

**Output**
```kotlin
LazyColumn { items(items) { ... } }
```

**Why**
- Efficient list rendering.

---

## Example 2 — Stable Params

**Input**
```kotlin
@Composable fun Item(data: MutableList<String>)
```

**Output**
```kotlin
@Composable fun Item(data: List<String>)
```

**Why**
- Avoids unnecessary recomposition.
