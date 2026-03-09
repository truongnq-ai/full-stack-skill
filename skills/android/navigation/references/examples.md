# Examples — Android Navigation (Refined)

## Example 1 — Safe Args

**Input**
```kotlin
navController.navigate("profile/"+id)
```

**Output**
```kotlin
val action = HomeDirections.actionToProfile(id)
navController.navigate(action)
```

**Why**
- Type-safe navigation.

---

## Example 2 — Single Activity

**Input**
```kotlin
Multiple activities per flow
```

**Output**
```kotlin
Single-activity + fragments
```

**Why**
- Simplifies nav stack.
