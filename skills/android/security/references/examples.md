# Examples — Android Security

## Example 1 — Enforce HTTPS

**Input**
```xml
<application android:usesCleartextTraffic="true" />
```

**Output**
```xml
<application android:usesCleartextTraffic="false" />
```

**Why**
- Blocks plaintext traffic.

---

## Example 2 — Exported Components

**Input**
```xml
<activity android:name=".MainActivity" />
```

**Output**
```xml
<activity android:name=".MainActivity" android:exported="false" />
```

**Why**
- Prevents unintended external access.
