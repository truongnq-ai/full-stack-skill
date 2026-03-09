# Examples — Angular Performance (Refined)

## Example 1 — OnPush

**Input**
```ts
@Component({ changeDetection: Default })
```

**Output**
```ts
@Component({ changeDetection: ChangeDetectionStrategy.OnPush })
```

**Why**
- Reduces change detection cost.

---

## Example 2 — TrackBy

**Input**
```html
<li *ngFor="let item of items">...</li>
```

**Output**
```html
<li *ngFor="let item of items; trackBy: trackById">...</li>
```

**Why**
- Avoids re-rendering list items.
