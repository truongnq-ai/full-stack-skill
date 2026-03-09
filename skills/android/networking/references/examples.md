# Examples — Android Networking (Refined)

## Example 1 — OkHttp Interceptor

**Input**
```kotlin
OkHttpClient()
```

**Output**
```kotlin
OkHttpClient.Builder().addInterceptor(AuthInterceptor())
```

**Why**
- Centralizes auth headers.

---

## Example 2 — Timeout

**Input**
```kotlin
OkHttpClient()
```

**Output**
```kotlin
OkHttpClient.Builder().callTimeout(30, TimeUnit.SECONDS)
```

**Why**
- Prevents hanging requests.
