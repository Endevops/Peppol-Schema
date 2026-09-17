/**
 * @description Invoice response status codes that require a clarification. The codes are Under query (UQ), Rejected (RE), and Conditionally accepted (CA).
 * Consumed by {@link withStatusCodes}, where the `status` array must contain at least one entry.
 *
 * @example
 *   ```ts
 *   invoiceResponseCodeNeedsSchema; // ['UQ', 'RE', 'CA']
 *   ```;
 */
export const invoiceResponseCodeNeedsSchema = ['UQ', 'RE', 'CA'] as const;
