/**
 * @description Unit tests for IS-R-009 (EINDAGI requires due date).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateIsR009 } from './is-r-009';

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

describe('IS-R-009 (EINDAGI requires due date)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateIsR009(document).passed).toEqual(true);
  });

  it('fails when an Icelandic EINDAGI document has no due date', async () => {
    const document = await asIcelandic(await decodeBaseExample());
    const altered = {
      ...document,
      dueDate: undefined,
      additionalDocumentReferences: [{ id: { id: '2024-01-15' }, documentDescription: 'EINDAGI' }],
    } as unknown as PeppolDocument;
    expect(validateIsR009(altered).passed).toEqual(false);
  });

  it('passes when an Icelandic EINDAGI document has a due date', async () => {
    const document = await asIcelandic(await decodeBaseExample());
    const altered = {
      ...document,
      additionalDocumentReferences: [{ id: { id: '2024-01-15' }, documentDescription: 'EINDAGI' }],
    } as unknown as PeppolDocument;
    expect(validateIsR009(altered).passed).toEqual(true);
  });
});
