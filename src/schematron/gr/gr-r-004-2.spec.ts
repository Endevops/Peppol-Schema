/**
 * @description Unit tests for GR-R-004-2 (MARK number is a positive integer).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateGrR004_2 } from './gr-r-004-2';

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

describe('GR-R-004-2 (MARK number is a positive integer)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateGrR004_2(document).passed).toEqual(true);
  });

  it('fails when a MARK number is not a positive integer', async () => {
    const document = await asGreek(await decodeBaseExample());
    const altered = {
      ...document,
      additionalDocumentReferences: [{ id: { id: '0' }, documentDescription: '##M.AR.K##' }],
    } as unknown as PeppolDocument;
    expect(validateGrR004_2(altered).passed).toEqual(false);
  });

  it('passes when a MARK number is a positive integer', async () => {
    const document = await asGreek(await decodeBaseExample());
    const altered = {
      ...document,
      additionalDocumentReferences: [{ id: { id: '123' }, documentDescription: '##M.AR.K##' }],
    } as unknown as PeppolDocument;
    expect(validateGrR004_2(altered).passed).toEqual(true);
  });
});
