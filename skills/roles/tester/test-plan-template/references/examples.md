# Examples — Test Plan Template

## Example 1: Defining Scope
**In-Scope**: Testing the new Stripe Payment Gateway integration for Credit Cards.
**Out-of-Scope**: PayPal and Crypto payments (handled by a different microservice, not touched in this release).
**Why**: Explicitly defining out-of-scope prevents stakeholders from asking "Why didn't you test PayPal?" after release.