/**
 * @description Unit tests for GR-R-010 (buyer endpoint TIN).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateGrR010 } from './gr-r-010';

async function asGreek(document: PeppolDocument): Promise<PeppolDocument> {
  return {
    ...document,
    accountingSupplierParty: {
      ...document.accountingSupplierParty,
      partyTaxSchemes: [{ companyId: 'EL094259216', taxSchemeId: { id: 'VAT' } }],
      postalAddress: { ...document.accountingSupplierParty.postalAddress, countryCode: { identificationCode: 'GR' } },
    },
    accountingCustomerParty: {
      ...document.accountingCustomerParty,
      partyTaxSchemes: [{ companyId: 'EL094259216', taxSchemeId: { id: 'VAT' } }],
      postalAddress: { ...document.accountingCustomerParty.postalAddress, countryCode: { identificationCode: 'GR' } },
    },
  } as unknown as PeppolDocument;
}

describe('GR-R-010 (buyer endpoint TIN)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateGrR010(document).passed).toEqual(true);
  });

  it('passes when a Greek buyer endpoint is a valid TIN with scheme 9933', async () => {
    const document = await asGreek(await decodeBaseExample());
    const altered = {
      ...document,
      accountingCustomerParty: { ...document.accountingCustomerParty, endpointId: { id: '094259216', schemeId: '9933' } },
    } as unknown as PeppolDocument;
    expect(validateGrR010(altered).passed).toEqual(true);
  });
});
