# Examples — Next.js i18n (Refined)

## Example 1 — Locale Segment

**Input**
```tsx
/app/page.tsx
```

**Output**
```tsx
/app/[lang]/page.tsx
```

**Why**
- Enables locale routing.

---

## Example 2 — Translation

**Input**
```tsx
<h1>{title}</h1>
```

**Output**
```tsx
<h1>{t('home.title')}</h1>
```

**Why**
- Uses translation keys.
