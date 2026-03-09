# Examples — Angular Style Guide (Refined)

## Example 1 — File Naming

**Input**
```text
userComponent.ts
```

**Output**
```text
user.component.ts
```

**Why**
- Consistent conventions.

---

## Example 2 — Single Responsibility

**Input**
```ts
@Component({ selector: 'app', template: '...' })
```

**Output**
```ts
@Component({ selector: 'app-user', template: '...' })
```

**Why**
- Clear component scope.
