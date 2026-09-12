import { Effect } from 'effect';
import { describe, expect, it } from 'vitest';

import { decodeInvoiceLines } from './decode-invoice-lines';

describe('decodeInvoiceLines', () => {
  it('returns undefined when the invoice line path is missing', () => {
    const result = Effect.runSync(decodeInvoiceLines({}, 'cac:InvoiceLine'));

    expect(result).toBeUndefined();
  });

  it('decodes a present, non-empty array of invoice lines', () => {
    const result = Effect.runSync(decodeInvoiceLines({ 'cac:InvoiceLine': [{ 'cbc:InvoicedQuantity': '4', 'cbc:ID': '1' }] }, 'cac:InvoiceLine'));

    expect(result).toEqual([expect.objectContaining({ id: '1', invoicedQuantity: { value: 4 } })]);
  });

  it('wraps a single (non-array) invoice line node into an array', () => {
    const result = Effect.runSync(decodeInvoiceLines({ 'cac:InvoiceLine': { 'cbc:InvoicedQuantity': '5' } }, 'cac:InvoiceLine'));

    expect(result).toEqual([expect.objectContaining({ invoicedQuantity: { value: 5 } })]);
  });
});
