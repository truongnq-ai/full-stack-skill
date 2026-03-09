# Examples — Angular Dependency Injection (Refined)

## Example 1 — ProvidedIn

**Input**
```ts
@Injectable()
class ApiService {}
```

**Output**
```ts
@Injectable({ providedIn: 'root' })
class ApiService {}
```

**Why**
- Singleton by default.

---

## Example 2 — Injection Token

**Input**
```ts
constructor(@Inject('API') api: string)
```

**Output**
```ts
const API_URL = new InjectionToken<string>('API_URL');
```

**Why**
- Type-safe tokens.
