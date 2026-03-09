# Examples — Angular Directives & Pipes (Refined)

## Example 1 — Pure Pipe

**Input**
```ts
@Pipe({ name: 'format' })
```

**Output**
```ts
@Pipe({ name: 'format', pure: true })
```

**Why**
- Performance benefits.

---

## Example 2 — Structural Directive

**Input**
```html
<div *ngIf="isAdmin"></div>
```

**Output**
```html
<div *hasRole="'admin'"></div>
```

**Why**
- Encapsulates access control.
