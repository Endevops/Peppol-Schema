import type { InvoiceStatusCodesKeys } from '#/values/invoice-status-codes.generated';

export const invoiceResponseCodesOrder: Record<InvoiceStatusCodesKeys, Array<InvoiceStatusCodesKeys>> = {
  AB: ['IP', 'UQ', 'AP', 'CA', 'PD', 'RE'],
  AP: ['PD'],
  CA: ['PD'],
  IP: ['UQ', 'CA', 'AP', 'PD', 'RE'],
  PD: [],
  RE: [],
  UQ: ['CA', 'AP', 'RE'],
};
