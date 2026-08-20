import { describe, expect, it } from 'vitest';

import { invoiceResponseCodesOrder } from './invoice-response-codes-order';

describe('invoiceResponseCodesOrder', () => {
  it('defines the transition order for each status', () => {
    expect(invoiceResponseCodesOrder.AB).toEqual(['IP', 'UQ', 'AP', 'CA', 'PD', 'RE']);
    expect(invoiceResponseCodesOrder.AP).toEqual(['PD']);
    expect(invoiceResponseCodesOrder.CA).toEqual(['PD']);
    expect(invoiceResponseCodesOrder.IP).toEqual(['UQ', 'CA', 'AP', 'PD', 'RE']);
    expect(invoiceResponseCodesOrder.PD).toEqual([]);
    expect(invoiceResponseCodesOrder.RE).toEqual([]);
    expect(invoiceResponseCodesOrder.UQ).toEqual(['CA', 'AP', 'RE']);
  });
});
