import type { InvoiceStatusCodes } from '#/schemas/values/invoice-status-codes';

export const invoiceResponseCodesOrder: Record<InvoiceStatusCodes, Array<InvoiceStatusCodes>> = {
  AB: ['IP', 'UQ', 'AP', 'CA', 'PD', 'RE'],
  AP: ['PD'],
  CA: ['PD'],
  IP: ['UQ', 'CA', 'AP', 'PD', 'RE'],
  PD: [],
  RE: [],
  UQ: ['CA', 'AP', 'RE'],
} as const satisfies Record<InvoiceStatusCodes, Array<InvoiceStatusCodes>>;
