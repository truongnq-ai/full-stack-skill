# Examples — Kotlin Language

## Example 1 — Data Class

**Input**
```kotlin
class User(val id: String, val name: String)
```

**Output**
```kotlin
data class User(val id: String, val name: String)
```

**Why**
- Auto equals/hashCode/toString.

---

## Example 2 — Sealed Result

**Input**
```kotlin
interface Result
```

**Output**
```kotlin
sealed interface Result
```

**Why**
- Exhaustive when checks.
