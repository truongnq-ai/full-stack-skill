# Examples — Android Background Work (Refined)

## Example 1 — WorkManager

**Input**
```kotlin
Thread { sync() }
```

**Output**
```kotlin
WorkManager.getInstance().enqueue(SyncWork())
```

**Why**
- Reliable background execution.

---

## Example 2 — Constraints

**Input**
```kotlin
WorkRequest()
```

**Output**
```kotlin
Constraints.Builder().setRequiredNetworkType(NetworkType.CONNECTED)
```

**Why**
- Runs only when safe.
