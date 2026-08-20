import { describe, expect, it } from 'vitest';

import { decodePaymentTerms } from './decode-payment-terms';

describe('decodePaymentTerms', () => {
  it('returns undefined when the payment terms path is missing', () => {
    const result = decodePaymentTerms({}, 'cac:PaymentTerms');

    expect(result).toBeUndefined();
  });

  it('returns undefined when the payment terms have no note', () => {
    const result = decodePaymentTerms({ 'cac:PaymentTerms': {} }, 'cac:PaymentTerms');

    expect(result).toBeUndefined();
  });

  it('decodes payment terms with a plain text note', () => {
    const result = decodePaymentTerms({ 'cac:PaymentTerms': { 'cbc:Note': 'Net 30' } }, 'cac:PaymentTerms');

    expect(result).toEqual({ note: 'Net 30' });
  });

  it('decodes payment terms with an object note', () => {
    const result = decodePaymentTerms({ 'cac:PaymentTerms': { 'cbc:Note': { '#text': 'Net 60' } } }, 'cac:PaymentTerms');

    expect(result).toEqual({ note: 'Net 60' });
  });
});
