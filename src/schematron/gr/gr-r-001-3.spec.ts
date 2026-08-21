/**
 * @description Unit tests for GR-R-001-3 (second segment matches issue date).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateGrR001_3 } from './gr-r-001-3';

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

describe('GR-R-001-3 (second segment matches issue date)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateGrR001_3(document).passed).toEqual(true);
  });

  it('fails when the second segment does not match the issue date', async () => {
    const document = await asGreek(await decodeBaseExample());
    const altered = { ...document, id: '094259216|01/01/2000|1|1.1|0|1' } as unknown as PeppolDocument;
    expect(validateGrR001_3(altered).passed).toEqual(false);
  });

  it('passes when the second segment matches the issue date', async () => {
    const document = await asGreek(await decodeBaseExample());
    const altered = { ...document, id: VALID_GREEK_ID } as unknown as PeppolDocument;
    expect(validateGrR001_3(altered).passed).toEqual(true);
  });
});
