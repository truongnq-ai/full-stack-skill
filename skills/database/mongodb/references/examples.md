# Examples — MongoDB (Refined)

## Example 1 — Avoid skip()

**Input**
```ts
Model.find().skip(10000)
```

**Output**
```ts
Model.find({ _id: { $gt: lastId } }).limit(20)
```

**Why**
- Prevents collection scan.

---

## Example 2 — ESR Index

**Input**
```js
find({status:'paid'}).sort({createdAt:-1}).where('total').gt(100)
```

**Output**
```js
createIndex({ status:1, createdAt:-1, total:1 })
```

**Why**
- Optimizes query path.
