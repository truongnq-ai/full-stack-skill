# Examples — Flutter Security

## Example 1 — Secure Storage

**Input**
```dart
await prefs.setString('token', token);
```

**Output**
```dart
await secureStorage.write(key: 'token', value: token);
```

**Why**
- Avoids plaintext storage.

---

## Example 2 — Obfuscation Flags

**Input**
```sh
flutter build apk
```

**Output**
```sh
flutter build apk --obfuscate --split-debug-info=./symbols
```

**Why**
- Reduces reverse-engineering risk.
