# Examples — Angular Routing (Refined)

## Example 1 — Lazy Module

**Input**
```ts
{ path: 'admin', component: AdminComponent }
```

**Output**
```ts
{ path: 'admin', loadChildren: () => import('./admin/admin.routes') }
```

**Why**
- Lazy loads feature.

---

## Example 2 — Guard

**Input**
```ts
// unprotected route
```

**Output**
```ts
canActivate: [AuthGuard]
```

**Why**
- Access control.
