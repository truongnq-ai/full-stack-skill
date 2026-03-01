# Observability Conventions (Detail)

## Logs
- JSON structured logs
- Include trace_id, user_id (nếu hợp lệ)

## Metrics
- Naming: <service>_<metric>_total
- Label vừa đủ, tránh high cardinality

## Tracing
- Propagate trace context
- Sampling theo traffic
