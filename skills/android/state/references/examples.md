# Examples — Android State (Refined)

## Example 1 — StateFlow

**Input**
```kotlin
val state = MutableLiveData()
```

**Output**
```kotlin
val state = MutableStateFlow(UiState())
```

**Why**
- Coroutines-friendly state.

---

## Example 2 — Immutable UiState

**Input**
```kotlin
data class UiState(var items: List<Item>)
```

**Output**
```kotlin
data class UiState(val items: List<Item>)
```

**Why**
- Prevents accidental mutation.
