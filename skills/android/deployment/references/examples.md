# Examples — Android Deployment (Refined)

## Example 1 — Release Signing

**Input**
```gradle
signingConfig null
```

**Output**
```gradle
signingConfig signingConfigs.release
```

**Why**
- Required for Play Store.

---

## Example 2 — ProGuard

**Input**
```gradle
minifyEnabled false
```

**Output**
```gradle
minifyEnabled true
```

**Why**
- Reduces APK size and obfuscates.
