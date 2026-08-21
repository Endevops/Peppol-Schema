/**
 * @description Unit tests for IS-R-008 (EINDAGI id is YYYY-MM-DD).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateIsR008 } from './is-r-008';

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

describe('IS-R-008 (EINDAGI id is YYYY-MM-DD)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateIsR008(document).passed).toEqual(true);
  });

  it('fails when an Icelandic EINDAGI id is not a date', async () => {
    const document = await asIcelandic(await decodeBaseExample());
    const altered = {
      ...document,
      additionalDocumentReferences: [{ id: { id: 'not-a-date' }, documentDescription: 'EINDAGI' }],
    } as unknown as PeppolDocument;
    expect(validateIsR008(altered).passed).toEqual(false);
  });

  it('passes when an Icelandic EINDAGI id is a valid date', async () => {
    const document = await asIcelandic(await decodeBaseExample());
    const altered = {
      ...document,
      additionalDocumentReferences: [{ id: { id: '2024-01-15' }, documentDescription: 'EINDAGI' }],
    } as unknown as PeppolDocument;
    expect(validateIsR008(altered).passed).toEqual(true);
  });
});
