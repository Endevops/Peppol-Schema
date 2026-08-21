/**
 * @description Unit tests for GR-R-001-2 (first segment is a valid TIN).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateGrR001_2 } from './gr-r-001-2';

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

const VALID_GREEK_ID = '094259216|13/11/2017|1|1.1|0|1';

describe('GR-R-001-2 (first segment is a valid TIN)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateGrR001_2(document).passed).toEqual(true);
  });

  it('fails when the first segment is not a valid TIN', async () => {
    const document = await asGreek(await decodeBaseExample());
    const altered = { ...document, id: '123456789|13/11/2017|1|1.1|0|1' } as unknown as PeppolDocument;
    expect(validateGrR001_2(altered).passed).toEqual(false);
  });

  it('passes when the first segment matches the supplier TIN', async () => {
    const document = await asGreek(await decodeBaseExample());
    const altered = { ...document, id: VALID_GREEK_ID } as unknown as PeppolDocument;
    expect(validateGrR001_2(altered).passed).toEqual(true);
  });
});
