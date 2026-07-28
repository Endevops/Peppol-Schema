import type { InvoiceStatusCodes } from '#/schemas/values/invoice-status-codes';

/**
 * @description Contant that returns the allowed next codes for invoice type codes.
 */
export const invoiceResponseCodesOrder: Record<InvoiceStatusCodes, Array<InvoiceStatusCodes>> = {
  AB: ['IP', 'UQ', 'AP', 'CA', 'PD', 'RE'],
  AP: ['PD'],
  CA: ['PD'],
  IP: ['UQ', 'CA', 'AP', 'PD', 'RE'],
  PD: [],
  RE: [],
  UQ: ['CA', 'AP', 'RE'],
} as const satisfies Record<InvoiceStatusCodes, Array<InvoiceStatusCodes>>;

/**
 * @description Array of response codes that requires a reason code.
 */
export const invoiceResponseCodeNeedsSchema = ['UQ', 'RE', 'CA'] as const;
/**
 * @description Array of response codes that does not require a reason code.
 */
export const invoiceResponseCodeNotNeedsSchema = ['AB', 'AP', 'IP', 'PD'] as const;
