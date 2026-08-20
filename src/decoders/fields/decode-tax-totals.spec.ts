import { describe, expect, it } from 'vitest';

import { decodeTaxTotals } from './decode-tax-totals';

const fullTaxTotalDoc = {
  'cac:TaxTotal': [
    {
      'cac:TaxSubtotal': [
        {
          'cac:TaxCategory': {
            'cac:TaxScheme': { 'cbc:ID': 'VAT' },
            'cbc:ID': 'S',
            'cbc:Percent': '25',
            'cbc:TaxExemptionReason': 'Standard rate',
            'cbc:TaxExemptionReasonCode': 'VATEX-1',
          },
          'cbc:TaxAmount': '25.00',
          'cbc:TaxableAmount': '100.00',
        },
      ],
      'cbc:TaxAmount': '25.00',
    },
  ],
};

describe('decodeTaxTotals', () => {
  it('returns undefined when the tax total path is missing', () => {
    const result = decodeTaxTotals({}, 'cac:TaxTotal');

    expect(result).toBeUndefined();
  });

  it('decodes a tax total with a fully populated tax subtotal', () => {
    const result = decodeTaxTotals(fullTaxTotalDoc, 'cac:TaxTotal');

    expect(result).toEqual([
      {
        taxAmount: { currencyId: '', value: 25 },
        taxSubtotals: [
          {
            taxAmount: { currencyId: '', value: 25 },
            taxCategory: { id: 'S', percent: 25, taxExemptionReason: 'Standard rate', taxExemptionReasonCode: 'VATEX-1', taxSchemeId: { id: 'VAT' } },
            taxableAmount: { currencyId: '', value: 100 },
          },
        ],
      },
    ]);
  });

  it('decodes a tax subtotal without a tax category to undefined', () => {
    const result = decodeTaxTotals(
      { 'cac:TaxTotal': [{ 'cac:TaxSubtotal': [{ 'cbc:TaxAmount': '25.00' }], 'cbc:TaxAmount': '25.00' }] },
      'cac:TaxTotal'
    );

    expect(result).toEqual([
      {
        taxAmount: { currencyId: '', value: 25 },
        taxSubtotals: [{ taxAmount: { currencyId: '', value: 25 }, taxCategory: undefined, taxableAmount: undefined }],
      },
    ]);
  });

  it('decodes a tax total without any tax subtotals', () => {
    const result = decodeTaxTotals({ 'cac:TaxTotal': [{ 'cbc:TaxAmount': '25.00' }] }, 'cac:TaxTotal');

    expect(result).toEqual([{ taxAmount: { currencyId: '', value: 25 }, taxSubtotals: undefined }]);
  });
});
