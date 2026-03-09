# Examples — React Component Patterns (Refined)

## Example 1 — Container/Presentational

**Input**
```tsx
function UserCard(){ /* fetch + render */ }
```

**Output**
```tsx
function UserCardView(props){...} // render only
function UserCard(){ const data=...; return <UserCardView {...data}/> }
```

**Why**
- Separates data from UI.

---

## Example 2 — Compound Component

**Input**
```tsx
<ModalHeader /><ModalBody />
```

**Output**
```tsx
<Modal><Modal.Header/><Modal.Body/></Modal>
```

**Why**
- Encapsulates structure.
