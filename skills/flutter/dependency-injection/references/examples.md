# Examples — Flutter DI (Refined)

## Example 1 — GetIt

**Input**
```dart
final api = Api();
```

**Output**
```dart
getIt.registerLazySingleton<Api>(() => Api());
```

**Why**
- Centralized DI container.

---

## Example 2 — Injectable

**Input**
```dart
class UserRepo {}
```

**Output**
```dart
@lazySingleton class UserRepo {}
```

**Why**
- Automated DI wiring.
