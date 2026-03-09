# Examples — NestJS File Uploads (Refined)

## Example 1 — File Validation

**Input**
```ts
@UploadedFile() file
```

**Output**
```ts
@UseInterceptors(FileInterceptor('file', { limits: { fileSize: 5_000_000 } }))
```

**Why**
- Enforces size limits.

---

## Example 2 — MIME Check

**Input**
```ts
// accept any file
```

**Output**
```ts
file.mimetype.startsWith('image/')
```

**Why**
- Prevents unsafe uploads.
