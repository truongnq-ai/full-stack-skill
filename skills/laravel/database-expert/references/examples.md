# Examples — Laravel Database Expert (Refined)

## Example 1 — Transaction

**Input**
```php
DB::table('a')->insert(...); DB::table('b')->insert(...);
```

**Output**
```php
DB::transaction(function(){ /* insert a + b */ });
```

**Why**
- Ensures atomicity.

---

## Example 2 — Index

**Input**
```php
Schema::table('users', function(Blueprint $t){});
```

**Output**
```php
$table->index(['tenant_id','created_at']);
```

**Why**
- Speeds up queries.
