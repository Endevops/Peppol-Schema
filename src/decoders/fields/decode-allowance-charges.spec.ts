import { Effect } from 'effect';
import { describe, expect, it } from 'vitest';

import { decodeAllowanceCharges } from './decode-allowance-charges.ts';

describe('decodeAllowanceCharges', () => {
  it('returns undefined when the allowance charge path is missing', () => {
    const result = Effect.runSync(decodeAllowanceCharges({}, 'cac:AllowanceCharge'));

    expect(result).toBeUndefined();
  });

  it('decodes a single allowance charge', () => {
    const result = Effect.runSync(
      decodeAllowanceCharges(
        {
          'cac:AllowanceCharge': {
            'cbc:AllowanceChargeReason': 'Discount',
            'cbc:Amount': { '#text': '100.00', '@currencyID': 'EUR' },
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
        amount: { currencyId: 'EUR', value: 100 },
        baseAmount: undefined,
        chargeIndicator: false,
        multiplierFactorNumeric: undefined,
        taxCategory: undefined,
      },
    ]);
  });

  it('decodes multiple allowance charges', () => {
    const result = Effect.runSync(
      decodeAllowanceCharges(
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

  it('maps the doc-level tax category', () => {
    const result = Effect.runSync(
      decodeAllowanceCharges(
        {
          'cac:AllowanceCharge': {
            'cac:TaxCategory': { 'cac:TaxScheme': { 'cbc:ID': 'VAT' }, 'cbc:ID': 'S', 'cbc:Percent': '25' },
            'cbc:Amount': { '#text': '100.00', '@currencyID': 'EUR' },
            'cbc:ChargeIndicator': false,
          },
        },
        'cac:AllowanceCharge'
      )
    );

    expect(result).toEqual([expect.objectContaining({ taxCategory: { id: 'S', percent: 25, taxSchemeId: { id: 'VAT' } } })]);
  });
});
