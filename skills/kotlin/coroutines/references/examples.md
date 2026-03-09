# Examples — Kotlin Coroutines (Refined)

## Example 1 — Structured Concurrency

**Input**
```kotlin
GlobalScope.launch { ... }
```

**Output**
```kotlin
viewModelScope.launch { ... }
```

**Why**
- Scoped lifecycle.

---

## Example 2 — Dispatcher

**Input**
```kotlin
withContext(Dispatchers.Main) { heavyWork() }
```

**Output**
```kotlin
withContext(Dispatchers.IO) { heavyWork() }
```

**Why**
- Avoids blocking UI.
