# Examples — NestJS Database (Refined)

## Example 1 — Repository Pattern

**Input**
```ts
this.prisma.user.findMany()
```

**Output**
```ts
this.userRepository.findAll()
```

**Why**
- Abstracts persistence layer.

---

## Example 2 — Transaction

**Input**
```ts
await createUser(); await createProfile();
```

**Output**
```ts
await prisma.$transaction([createUser(), createProfile()]);
```

**Why**
- Ensures atomicity.
