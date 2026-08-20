import { describe, expect, it } from 'vitest';

import { decodeCreditNoteLines } from './decode-credit-note-lines';

describe('decodeCreditNoteLines', () => {
  it('returns undefined when the credit note line path is missing', () => {
    const result = decodeCreditNoteLines({}, 'cac:CreditNoteLine');

    expect(result).toBeUndefined();
  });

  it('decodes a present, non-empty array of credit note lines', () => {
    const result = decodeCreditNoteLines({ 'cac:CreditNoteLine': [{ 'cbc:CreditedQuantity': '2', 'cbc:ID': '1' }] }, 'cac:CreditNoteLine');

    expect(result).toEqual([expect.objectContaining({ creditedQuantity: { value: 2 }, id: '1' })]);
  });

  it('wraps a single (non-array) credit note line node into an array', () => {
    const result = decodeCreditNoteLines({ 'cac:CreditNoteLine': { 'cbc:CreditedQuantity': '3' } }, 'cac:CreditNoteLine');

    expect(result).toEqual([expect.objectContaining({ creditedQuantity: { value: 3 } })]);
  });
});
