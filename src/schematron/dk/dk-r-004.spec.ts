/**
 * @description Unit tests for DK-R-004 (ZZZ allowance reason).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateDkR004 } from './dk-r-004';

async function asDanish(document: PeppolDocument): Promise<PeppolDocument> {
  return {
    ...document,
    accountingSupplierParty: {
      ...document.accountingSupplierParty,
      partyTaxSchemes: [{ companyId: 'DK12345678', taxSchemeId: { id: 'VAT' } }],
      postalAddress: { ...document.accountingSupplierParty.postalAddress, countryCode: { identificationCode: 'DK' } },
    },
    accountingCustomerParty: {
      ...document.accountingCustomerParty,
      partyTaxSchemes: [{ companyId: 'DK87654321', taxSchemeId: { id: 'VAT' } }],
      postalAddress: { ...document.accountingCustomerParty.postalAddress, countryCode: { identificationCode: 'DK' } },
    },
  } as unknown as PeppolDocument;
}

describe('DK-R-004 (ZZZ allowance reason)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateDkR004(document).passed).toEqual(true);
  });

  it('fails when a Danish document uses reason code ZZZ with an invalid reason', async () => {
    const document = await asDanish(await decodeBaseExample());
    const altered = {
      ...document,
      allowanceCharges: [
        { amount: { currencyId: 'EUR', value: 10 }, chargeIndicator: false, allowanceChargeReasonCode: 'ZZZ', allowanceChargeReason: 'bad reason' },
      ],
    } as unknown as PeppolDocument;
    expect(validateDkR004(altered).passed).toEqual(false);
  });

  it('passes when a Danish document uses reason code ZZZ with a 4-digit reason', async () => {
    const document = await asDanish(await decodeBaseExample());
    const altered = {
      ...document,
      allowanceCharges: [
        { amount: { currencyId: 'EUR', value: 10 }, chargeIndicator: false, allowanceChargeReasonCode: 'ZZZ', allowanceChargeReason: '1234' },
      ],
    } as unknown as PeppolDocument;
    expect(validateDkR004(altered).passed).toEqual(true);
  });
});
