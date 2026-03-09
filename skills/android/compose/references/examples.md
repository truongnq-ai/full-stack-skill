# Examples — Android Compose (Refined)

## Example 1 — State Hoisting

**Input**
```kotlin
@Composable fun Counter(){ var c by remember{ mutableStateOf(0) } }
```

**Output**
```kotlin
@Composable fun Counter(c:Int,onInc:()->Unit)
```

**Why**
- Makes UI reusable.

---

## Example 2 — rememberSaveable

**Input**
```kotlin
var text by remember { mutableStateOf("") }
```

**Output**
```kotlin
var text by rememberSaveable { mutableStateOf("") }
```

**Why**
- Preserves state across config changes.
