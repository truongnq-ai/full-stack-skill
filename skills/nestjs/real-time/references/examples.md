# Examples — NestJS Real-Time (Refined)

## Example 1 — Gateway Auth

**Input**
```ts
@WebSocketGateway()
export class EventsGateway {}
```

**Output**
```ts
@UseGuards(WsJwtGuard)
@WebSocketGateway()
export class EventsGateway {}
```

**Why**
- Protects socket connections.

---

## Example 2 — Room Emit

**Input**
```ts
server.emit('event', data)
```

**Output**
```ts
server.to(roomId).emit('event', data)
```

**Why**
- Targets specific clients.
