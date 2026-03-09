# Examples — iOS Performance (Refined)

## Example 1 — Reuse Cells

**Input**
```swift
UITableViewCell()
```

**Output**
```swift
tableView.dequeueReusableCell(withIdentifier: "Cell")
```

**Why**
- Efficient list rendering.

---

## Example 2 — Image Caching

**Input**
```swift
UIImage(data: data)
```

**Output**
```swift
// use SDWebImage/URLCache
```

**Why**
- Avoids repeated downloads.
