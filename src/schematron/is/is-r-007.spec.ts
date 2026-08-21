/**
 * @description Unit tests for IS-R-007 (payment means code 42 requires 12-digit account).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateIsR007 } from './is-r-007';

async function asIcelandic(document: PeppolDocument): Promise<PeppolDocument> {
  return {
    ...document,
    accountingSupplierParty: {
      ...document.accountingSupplierParty,
      partyTaxSchemes: [{ companyId: 'IS123456789', taxSchemeId: { id: 'VAT' } }],
      postalAddress: { ...document.accountingSupplierParty.postalAddress, countryCode: { identificationCode: 'IS' } },
    },
    accountingCustomerParty: {
      ...document.accountingCustomerParty,
      partyTaxSchemes: [{ companyId: 'IS987654321', taxSchemeId: { id: 'VAT' } }],
      postalAddress: { ...document.accountingCustomerParty.postalAddress, countryCode: { identificationCode: 'IS' } },
    },
  } as unknown as PeppolDocument;
}

describe('IS-R-007 (payment means code 42 requires 12-digit account)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateIsR007(document).passed).toEqual(true);
  });

  it('fails when an Icelandic document uses code 42 with a short account id', async () => {
    const document = await asIcelandic(await decodeBaseExample());
    const altered = {
      ...document,
      paymentMeans: [{ paymentMeansCode: { code: '42' }, payeeFinancialAccount: { id: '123' } }],
    } as unknown as PeppolDocument;
    expect(validateIsR007(altered).passed).toEqual(false);
  });

  it('passes when an Icelandic document uses code 42 with a 12-digit account id', async () => {
    const document = await asIcelandic(await decodeBaseExample());
    const altered = {
      ...document,
      paymentMeans: [{ paymentMeansCode: { code: '42' }, payeeFinancialAccount: { id: '123456789012' } }],
    } as unknown as PeppolDocument;
    expect(validateIsR007(altered).passed).toEqual(true);
  });
});
