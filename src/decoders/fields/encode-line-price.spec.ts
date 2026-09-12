import { Effect } from 'effect';
import { describe, it, expect } from 'vitest';

import { encodeLinePrice } from './encode-line-price';

describe('encodeLinePrice', () => {
  it('returns undefined when price is missing', () => {
    // ❌ Negative: undefined price → undefined.
    expect(Effect.runSync(encodeLinePrice(undefined))).toBeUndefined();
  });

  it('encodes a fully present price', () => {
    // ✅ Positive: amount, base quantity and allowance charge are all encoded.
    expect(
      Effect.runSync(
        encodeLinePrice({
          priceAmount: { value: 10, currencyId: 'EUR' },
          baseQuantity: { value: 2, unitCode: 'C62' },
          allowanceCharge: { chargeIndicator: false, amount: { value: 2, currencyId: 'EUR' }, baseAmount: { value: 10, currencyId: 'EUR' } },
        })
      )
    ).toEqual({
      'cbc:PriceAmount': { '#text': 10, '@currencyID': 'EUR' },
      'cbc:BaseQuantity': { '#text': 2, '@unitCode': 'C62' },
      'cac:AllowanceCharge': {
        'cbc:ChargeIndicator': false,
        'cbc:Amount': { '#text': 2, '@currencyID': 'EUR' },
        'cbc:BaseAmount': { '#text': 10, '@currencyID': 'EUR' },
      },
    });
  });
});
