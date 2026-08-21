/**
 * @description Unit tests for GR-S-008-1 (exactly one invoice url).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateGrS008_1 } from './gr-s-008-1';

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

describe('GR-S-008-1 (exactly one invoice url)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateGrS008_1(document).passed).toEqual(true);
  });

  it('fails when a Greek document has two invoice urls', async () => {
    const document = await asGreek(await decodeBaseExample());
    const altered = {
      ...document,
      additionalDocumentReferences: [
        { id: { id: 'a' }, documentDescription: '##INVOICE|URL##' },
        { id: { id: 'b' }, documentDescription: '##INVOICE|URL##' },
      ],
    } as unknown as PeppolDocument;
    expect(validateGrS008_1(altered).passed).toEqual(false);
  });
});
