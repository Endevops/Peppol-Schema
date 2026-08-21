/**
 * @description Unit tests for GR-R-009 (supplier endpoint TIN).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateGrR009 } from './gr-r-009';

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

describe('GR-R-009 (supplier endpoint TIN)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateGrR009(document).passed).toEqual(true);
  });

  it('fails when a Greek supplier endpoint is not a valid TIN with scheme 9933', async () => {
    const document = await asGreek(await decodeBaseExample());
    expect(validateGrR009(document).passed).toEqual(false);
  });

  it('passes when a Greek supplier endpoint is a valid TIN with scheme 9933', async () => {
    const document = await asGreek(await decodeBaseExample());
    const altered = {
      ...document,
      accountingSupplierParty: { ...document.accountingSupplierParty, endpointId: { id: '094259216', schemeId: '9933' } },
    } as unknown as PeppolDocument;
    expect(validateGrR009(altered).passed).toEqual(true);
  });
});
