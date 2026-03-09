# Examples — React Security

## Example 1 — Dangerous HTML

**Input**
```tsx
<div dangerouslySetInnerHTML={{ __html: userInput }} />
```

**Output**
```tsx
<div dangerouslySetInnerHTML={{ __html: sanitize(userInput) }} />
```

**Why**
- Prevents XSS by sanitizing input.

---

## Example 2 — Untrusted URL

**Input**
```tsx
<a href={redirectUrl}>Continue</a>
```

**Output**
```tsx
<a href={safeRedirect(redirectUrl)}>Continue</a>
```

**Why**
- Avoids open redirect vulnerabilities.
