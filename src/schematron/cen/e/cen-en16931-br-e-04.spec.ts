/**
 * @description Unit tests for CEN-EN16931-BR-E-04.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrE04 } from './cen-en16931-br-e-04';

describe('CEN-EN16931-BR-E-04', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931BrE04(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.allowanceCharges = [
      {
        allowanceChargeReason: undefined,
        allowanceChargeReasonCode: undefined,
        amount: { currencyId: 'EUR', value: 10 },
        baseAmount: undefined,
        chargeIndicator: true,
        taxCategory: { id: 'E', percent: 0, taxSchemeId: { id: 'VAT' } },
      },
    ];
    document.accountingSupplierParty.partyTaxSchemes = undefined;
    document.taxRepresentativeParty = undefined;
    expect(validateCenEn16931BrE04(document).passed).toEqual(false);
  });
});
