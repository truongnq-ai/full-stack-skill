# Examples — Next.js Optimization (Refined)

## Example 1 — Image

**Input**
```tsx
<img src="/hero.png" />
```

**Output**
```tsx
<Image src="/hero.png" width={800} height={400} priority />
```

**Why**
- Uses optimized image pipeline.

---

## Example 2 — Script Strategy

**Input**
```tsx
<script src="/analytics.js" />
```

**Output**
```tsx
<Script src="/analytics.js" strategy="afterInteractive" />
```

**Why**
- Avoids blocking render.
