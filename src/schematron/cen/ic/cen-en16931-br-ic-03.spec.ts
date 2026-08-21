/**
 * @description Unit tests for CEN-EN16931-BR-IC-03.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrIc03 } from './cen-en16931-br-ic-03';

describe('CEN-EN16931-BR-IC-03', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931BrIc03(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.allowanceCharges = [
      {
        allowanceChargeReason: undefined,
        allowanceChargeReasonCode: undefined,
        amount: { currencyId: 'EUR', value: 10 },
        baseAmount: undefined,
        chargeIndicator: false,
        taxCategory: { id: 'K', percent: 0, taxSchemeId: { id: 'VAT' } },
      },
    ];
    document.accountingSupplierParty.partyTaxSchemes = undefined;
    document.taxRepresentativeParty = undefined;
    document.accountingCustomerParty.partyTaxSchemes = undefined;
    document.accountingCustomerParty.partyLegalEntity.companyId = undefined;
    expect(validateCenEn16931BrIc03(document).passed).toEqual(false);
  });
});
