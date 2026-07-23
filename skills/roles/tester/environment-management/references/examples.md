# Examples — Environment Management

## Example 1: Safe Database Reset
**Input**: Pipeline runs a reset script for Staging.
**Action**: Script runs `NODE_ENV=staging npm run db:reset`. The script explicitly checks that `process.env.DB_HOST` does not contain the string "prod".
**Output**: The database is dropped and reseeded with mock data.
**Why**: Prevents catastrophic accidental drops of Production databases by enforcing hard environment constraints.