import { Effect } from 'effect';
import { describe, expect, it } from 'vitest';

import { decodePartiesTaxScheme } from './decode-parties-tax-scheme';

describe('decodePartiesTaxScheme', () => {
  it('returns undefined when the party tax scheme path is missing', () => {
    const result = Effect.runSync(decodePartiesTaxScheme({}, 'cac:PartyTaxScheme'));

    expect(result).toBeUndefined();
  });

  it('decodes an array of party tax scheme nodes', () => {
    const result = Effect.runSync(
      decodePartiesTaxScheme(
        {
          'cac:PartyTaxScheme': [
            { 'cac:TaxScheme': { 'cbc:ID': 'VAT' }, 'cbc:CompanyID': 'VAT1' },
            { 'cac:TaxScheme': { 'cbc:ID': 'ISR' }, 'cbc:CompanyID': 'NO123' },
          ],
        },
        'cac:PartyTaxScheme'
      )
    );

    expect(result).toEqual([
      { companyId: 'VAT1', taxSchemeId: { id: 'VAT' } },
      { companyId: 'NO123', taxSchemeId: { id: 'ISR' } },
    ]);
  });

  it('skips array elements that fail to decode into a party tax scheme', () => {
    const result = Effect.runSync(decodePartiesTaxScheme({ 'cac:PartyTaxScheme': [null] }, 'cac:PartyTaxScheme'));

    expect(result).toEqual([]);
  });
});
