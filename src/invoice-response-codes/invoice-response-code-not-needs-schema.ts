/**
 * @description Invoice response status codes that do not require a clarification. The codes are Message acknowledgement (AB), Accepted (AP), In process (IP), and
 * Paid (PD). Consumed by {@link withoutStatusCodes}, where `status` is optional.
 *
 * @example
 *   ```ts
 *   invoiceResponseCodeNotNeedsSchema; // ['AB', 'AP', 'IP', 'PD']
 *   ```;
 */
export const invoiceResponseCodeNotNeedsSchema = ['AB', 'AP', 'IP', 'PD'] as const;
