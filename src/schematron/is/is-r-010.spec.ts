/**
 * @description Unit tests for IS-R-010 (EINDAGI id same or later than due date).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateIsR010 } from './is-r-010';

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

describe('IS-R-010 (EINDAGI id same or later than due date)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateIsR010(document).passed).toEqual(true);
  });

  it('fails when an Icelandic EINDAGI id is earlier than the due date', async () => {
    const document = await asIcelandic(await decodeBaseExample());
    const altered = {
      ...document,
      dueDate: '2024-12-01',
      additionalDocumentReferences: [{ id: { id: '2024-01-15' }, documentDescription: 'EINDAGI' }],
    } as unknown as PeppolDocument;
    expect(validateIsR010(altered).passed).toEqual(false);
  });

  it('passes when an Icelandic EINDAGI id is later than the due date', async () => {
    const document = await asIcelandic(await decodeBaseExample());
    const altered = {
      ...document,
      dueDate: '2024-01-15',
      additionalDocumentReferences: [{ id: { id: '2024-12-01' }, documentDescription: 'EINDAGI' }],
    } as unknown as PeppolDocument;
    expect(validateIsR010(altered).passed).toEqual(true);
  });
});
