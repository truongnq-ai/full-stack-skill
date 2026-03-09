# Examples — Next.js Pages Router (Refined)

## Example 1 — SSR

**Input**
```tsx
export default function Page(){ /* fetch in component */ }
```

**Output**
```tsx
export async function getServerSideProps(){ /* fetch server */ }
```

**Why**
- Proper SSR data fetching.

---

## Example 2 — SSG

**Input**
```tsx
// fetch at runtime
```

**Output**
```tsx
export async function getStaticProps(){ /* build-time fetch */ }
```

**Why**
- Faster cached pages.
