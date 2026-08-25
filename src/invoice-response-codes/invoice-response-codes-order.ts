import type { invoiceStatusCodesKeys } from '#/values/invoice-status-codes.generated';

type StatusCode = (typeof invoiceStatusCodesKeys)[number];

export const invoiceResponseCodesOrder: Record<StatusCode, Array<StatusCode>> = {
  AB: ['IP', 'UQ', 'AP', 'CA', 'PD', 'RE'],
  AP: ['PD'],
  CA: ['PD'],
  IP: ['UQ', 'CA', 'AP', 'PD', 'RE'],
  PD: [],
  RE: [],
  UQ: ['CA', 'AP', 'RE'],
};
