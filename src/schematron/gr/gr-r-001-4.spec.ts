/**
 * @description Unit tests for GR-R-001-4 (third segment is a positive integer).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateGrR001_4 } from './gr-r-001-4';

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

describe('GR-R-001-4 (third segment is a positive integer)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateGrR001_4(document).passed).toEqual(true);
  });

  it('fails when the third segment is not a number', async () => {
    const document = await asGreek(await decodeBaseExample());
    const altered = { ...document, id: '094259216|13/11/2017|abc|1.1|0|1' } as unknown as PeppolDocument;
    expect(validateGrR001_4(altered).passed).toEqual(false);
  });

  it('passes when the third segment is a positive integer', async () => {
    const document = await asGreek(await decodeBaseExample());
    const altered = { ...document, id: VALID_GREEK_ID } as unknown as PeppolDocument;
    expect(validateGrR001_4(altered).passed).toEqual(true);
  });
});
