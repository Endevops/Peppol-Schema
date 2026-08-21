/**
 * @description Unit tests for IS-R-001 (invoice type 380 or 381).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateIsR001 } from './is-r-001';

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

describe('IS-R-001 (invoice type 380 or 381)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateIsR001(document).passed).toEqual(true);
  });

  it('fails when an Icelandic document uses an unsupported invoice type', async () => {
    const document = await asIcelandic(await decodeBaseExample());
    const altered = { ...document, invoiceTypeCode: '999' } as unknown as PeppolDocument;
    expect(validateIsR001(altered).passed).toEqual(false);
  });

  it('passes when an Icelandic document uses invoice type 380', async () => {
    const document = await asIcelandic(await decodeBaseExample());
    const altered = { ...document, invoiceTypeCode: '380' } as unknown as PeppolDocument;
    expect(validateIsR001(altered).passed).toEqual(true);
  });
});
