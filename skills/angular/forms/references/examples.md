# Examples — Angular Forms (Refined)

## Example 1 — Reactive Form

**Input**
```ts
// template-driven
```

**Output**
```ts
this.form = this.fb.group({ email: ['', [Validators.email]] })
```

**Why**
- Strong validation control.

---

## Example 2 — Typed Forms

**Input**
```ts
FormGroup
```

**Output**
```ts
FormGroup<{ email: FormControl<string> }>
```

**Why**
- Type-safe forms.
