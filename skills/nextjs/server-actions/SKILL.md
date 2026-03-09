---
name: Next.js Server Actions
description: Mutations, Form handling, and RPC-style calls.
metadata:
  labels:
    - nextjs
    - actions
    - mutations
    - server-actions
  triggers:
    priority: medium
    confidence: 0.7
    files:
      - app/**/actions.ts
      - src/app/**/actions.ts
      - app/**/*.tsx
      - src/app/**/*.tsx
    keywords:
      - use server
      - Server Action
      - revalidatePath
      - useFormStatus
workflow_ref: ui-ux-pro-max
---

# Server Actions

## **Priority: P1 (HIGH)**

## Output Template

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"] # or []
next_checks: ["<check 1>"]
```

- **Summary**: <what changed / what was done>
- **Risks**: <known risks or "none">
- **Next Checks**: <tests/verification steps>

> [!WARNING]
> If the project uses the `pages/` directory instead of the App Router, **ignore** this skill entirely.

Handle form submissions and mutations without creating API endpoints.

## Implementation

- **Directive**: Add `'use server'` at the top of an async function.
- **Usage**: Pass to `action` prop of `<form>` or invoke from event handlers.

```tsx
// actions.ts
'use server';
export async function createPost(formData: FormData) {
  const title = formData.get('title');
  await db.post.create({ title });
  revalidatePath('/posts'); // Refresh UI
}
```

## Client Invocation

- **Form**: `<form action={createPost}>` (Progressive enhancements work without JS).
- **Event Handler**: `onClick={() => createPost(data)}`.
- **Pending State**: Use `useFormStatus` hook (must be inside a component rendered within the form).

## **P1: Operational Standard**

## References

- [Examples (Input/Output)](references/examples.md)
