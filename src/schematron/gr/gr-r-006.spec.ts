/**
 * @description Unit tests for GR-R-006 (buyer VAT when buyer is Greek).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateGrR006 } from './gr-r-006';

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

describe('GR-R-006 (buyer VAT when buyer is Greek)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateGrR006(document).passed).toEqual(true);
  });

  it('passes when both parties are Greek and the buyer VAT is valid', async () => {
    const document = await asGreek(await decodeBaseExample());
    expect(validateGrR006(document).passed).toEqual(true);
  });

  it('fails when both parties are Greek and the buyer VAT is not a valid TIN', async () => {
    const document = await asGreek(await decodeBaseExample());
    const altered = {
      ...document,
      accountingCustomerParty: { ...document.accountingCustomerParty, partyTaxSchemes: [{ companyId: 'EL123456789', taxSchemeId: { id: 'VAT' } }] },
    } as unknown as PeppolDocument;
    expect(validateGrR006(altered).passed).toEqual(false);
  });
});
