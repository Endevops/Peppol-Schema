/**
 * @description Unit tests for IS-R-005 (buyer address).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateIsR005 } from './is-r-005';

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

describe('IS-R-005 (buyer address)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateIsR005(document).passed).toEqual(true);
  });

  it('fails when both parties are Icelandic and the buyer has no street', async () => {
    const document = await asIcelandic(await decodeBaseExample());
    const altered = {
      ...document,
      accountingCustomerParty: {
        ...document.accountingCustomerParty,
        postalAddress: { ...document.accountingCustomerParty.postalAddress, streetName: undefined },
      },
    } as unknown as PeppolDocument;
    expect(validateIsR005(altered).passed).toEqual(false);
  });

  it('passes when both parties are Icelandic and the buyer has a complete address', async () => {
    const document = await asIcelandic(await decodeBaseExample());
    expect(validateIsR005(document).passed).toEqual(true);
  });
});
