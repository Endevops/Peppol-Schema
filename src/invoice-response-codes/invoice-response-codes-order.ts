import type { InvoiceStatusCodesKeys } from '#/values/invoice-status-codes.generated';

/**
 * @description Map of allowed status transitions for an invoice response, keyed by the current status code. Each value lists the status codes that may follow the
 * key. Keys and values are {@link InvoiceStatusCodesKeys}. The terminal statuses PD and RE map to empty arrays.
 *
 * @example
 *   ```ts
 *   invoiceResponseCodesOrder.UQ; // ['CA', 'AP', 'RE']
 *   invoiceResponseCodesOrder.PD; // []
 *   ```;
 */
export const invoiceResponseCodesOrder: Record<InvoiceStatusCodesKeys, Array<InvoiceStatusCodesKeys>> = {
  AB: ['IP', 'UQ', 'AP', 'CA', 'PD', 'RE'],
  AP: ['PD'],
  CA: ['PD'],
  IP: ['UQ', 'CA', 'AP', 'PD', 'RE'],
  PD: [],
  RE: [],
  UQ: ['CA', 'AP', 'RE'],
};
