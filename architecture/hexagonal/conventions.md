# Hexagonal Conventions (Detail)

## Ports
- Inbound ports: use case interfaces
- Outbound ports: persistence/message gateways

## Adapters
- Inbound: REST, GraphQL, gRPC
- Outbound: DB, cache, external services

## Dependency
- Core không phụ thuộc adapter
