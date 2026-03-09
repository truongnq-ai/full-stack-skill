# Examples — Android DI (Refined)

## Example 1 — Hilt Inject

**Input**
```kotlin
class UserRepo()
```

**Output**
```kotlin
@Singleton class UserRepo @Inject constructor(...)
```

**Why**
- Enables DI graph.

---

## Example 2 — Module

**Input**
```kotlin
// manual provides
```

**Output**
```kotlin
@Module @InstallIn(SingletonComponent::class)
object AppModule { @Provides fun api(): Api }
```

**Why**
- Centralized providers.
