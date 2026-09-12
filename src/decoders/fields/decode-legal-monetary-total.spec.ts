import { Effect } from 'effect';
import { describe, expect, it } from 'vitest';

import { decodeLegalMonetaryTotal } from './decode-legal-monetary-total';

describe('decodeLegalMonetaryTotal', () => {
  it('returns undefined when the legal monetary total path is missing', () => {
    const result = Effect.runSync(decodeLegalMonetaryTotal({}, 'cac:LegalMonetaryTotal'));

    expect(result).toBeUndefined();
  });

  it('decodes a present legal monetary total node', () => {
    const result = Effect.runSync(
      decodeLegalMonetaryTotal(
        {
          'cac:LegalMonetaryTotal': {
            'cbc:LineExtensionAmount': '100.00',
            'cbc:PayableAmount': '120.00',
            'cbc:TaxExclusiveAmount': '100.00',
            'cbc:TaxInclusiveAmount': '120.00',
          },
        },
        'cac:LegalMonetaryTotal'
      )
    );

    expect(result).toEqual({
      allowanceTotalAmount: undefined,
      chargeTotalAmount: undefined,
      lineExtensionAmount: { currencyId: '', value: 100 },
      payableAmount: { currencyId: '', value: 120 },
      payableRoundingAmount: undefined,
      prepaidAmount: undefined,
      taxExclusiveAmount: { currencyId: '', value: 100 },
      taxInclusiveAmount: { currencyId: '', value: 120 },
    });
  });

  it('returns an object of undefined amounts for a present but empty node', () => {
    const result = Effect.runSync(decodeLegalMonetaryTotal({ 'cac:LegalMonetaryTotal': {} }, 'cac:LegalMonetaryTotal'));

    expect(result).toEqual({
      allowanceTotalAmount: undefined,
      chargeTotalAmount: undefined,
      lineExtensionAmount: undefined,
      payableAmount: undefined,
      payableRoundingAmount: undefined,
      prepaidAmount: undefined,
      taxExclusiveAmount: undefined,
      taxInclusiveAmount: undefined,
    });
  });
});
