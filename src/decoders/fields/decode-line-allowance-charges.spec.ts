import { Effect } from 'effect';
import { describe, expect, it } from 'vitest';

import { decodeLineAllowanceCharges } from './decode-line-allowance-charges.ts';

describe('decodeLineAllowanceCharges', () => {
  it('returns undefined when the allowance charge path is missing', () => {
    const result = Effect.runSync(decodeLineAllowanceCharges({}, 'cac:AllowanceCharge'));

    expect(result).toBeUndefined();
  });

  it('decodes a single line allowance charge', () => {
    const result = Effect.runSync(
      decodeLineAllowanceCharges(
        {
          'cac:AllowanceCharge': {
            'cbc:AllowanceChargeReason': 'Discount',
            'cbc:Amount': { '#text': '10.00', '@currencyID': 'EUR' },
            'cbc:ChargeIndicator': false,
          },
        },
        'cac:AllowanceCharge'
      )
    );

    expect(result).toEqual([
      {
        allowanceChargeReason: 'Discount',
        allowanceChargeReasonCode: undefined,
        amount: { currencyId: 'EUR', value: 10 },
        baseAmount: undefined,
        chargeIndicator: false,
        multiplierFactorNumeric: undefined,
      },
    ]);
  });

  it('decodes multiple line allowance charges', () => {
    const result = Effect.runSync(
      decodeLineAllowanceCharges(
        {
          'cac:AllowanceCharge': [
            { 'cbc:Amount': { '#text': '10.00', '@currencyID': 'EUR' }, 'cbc:ChargeIndicator': false },
            { 'cbc:Amount': { '#text': '5.00', '@currencyID': 'EUR' }, 'cbc:ChargeIndicator': true },
          ],
        },
        'cac:AllowanceCharge'
      )
    );

    expect(result).toEqual([
      expect.objectContaining({ amount: { currencyId: 'EUR', value: 10 }, chargeIndicator: false }),
      expect.objectContaining({ amount: { currencyId: 'EUR', value: 5 }, chargeIndicator: true }),
    ]);
  });
});
