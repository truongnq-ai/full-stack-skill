# Examples — Performance Testing

## Example 1: Load Test SLA Validation
**Requirement**: `/api/search` must handle 500 RPS with p95 < 200ms.
**Result**: 
- `http_req_failed`: 0.00%
- `http_req_duration`: p(95) = 450ms.
**Action**: Fail the test. Log a Performance Defect. The system is too slow under load.

## Example 2: Soak Testing (Memory Leak Hunt)
**Action**: Run 50 concurrent users for 8 hours.
**Result**: System RAM utilization grew from 500MB to 4GB and crashed.
**Action**: Log a Critical Memory Leak bug.