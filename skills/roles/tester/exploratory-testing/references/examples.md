# Examples — Exploratory Testing

## Example 1: Timeboxed Charter
**Charter**: Explore the "Shopping Cart" module focusing on network interruption.
**Timebox**: 30 Minutes.
**Execution**: Add items to cart. Turn off Wi-Fi. Try to apply a promo code. Turn Wi-Fi back on.
**Debrief**: Found `BUG-112`: Promo code spinner hangs infinitely when network disconnects, instead of showing a timeout error. Test case created for future regression.