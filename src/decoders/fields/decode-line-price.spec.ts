import { describe, expect, it } from 'vitest';

import { decodeLinePrice } from './decode-line-price';

describe('decodeLinePrice', () => {
  it('returns undefined when the price path is missing', () => {
    const result = decodeLinePrice({}, 'cac:Price');

    expect(result).toBeUndefined();
  });

  it('decodes a present price node', () => {
    const result = decodeLinePrice(
      {
        'cac:Price': {
          'cac:AllowanceCharge': { 'cbc:Amount': '1.00', 'cbc:ChargeIndicator': false },
          'cbc:BaseQuantity': '2',
          'cbc:PriceAmount': '10.00',
        },
      },
      'cac:Price'
    );

    expect(result).toEqual({
      allowanceCharge: { amount: { currencyId: '', value: 1 }, baseAmount: undefined, chargeIndicator: false },
      baseQuantity: { value: 2 },
      priceAmount: { currencyId: '', value: 10 },
    });
  });

  it('decodes a present but empty price node to undefined fields', () => {
    const result = decodeLinePrice({ 'cac:Price': {} }, 'cac:Price');

    expect(result).toEqual({ allowanceCharge: undefined, baseQuantity: undefined, priceAmount: undefined });
  });
});
