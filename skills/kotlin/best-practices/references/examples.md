# Examples — Kotlin Best Practices (Refined)

## Example 1 — Use Result

**Input**
```kotlin
fun load(): Data { throw Exception() }
```

**Output**
```kotlin
fun load(): Result<Data> = runCatching { ... }
```

**Why**
- Encapsulates failure.

---

## Example 2 — Immutable Collections

**Input**
```kotlin
val list = mutableListOf(1,2,3)
```

**Output**
```kotlin
val list = listOf(1,2,3)
```

**Why**
- Avoids accidental mutation.
