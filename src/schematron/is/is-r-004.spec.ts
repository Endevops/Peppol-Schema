/**
 * @description Unit tests for IS-R-004 (buyer legal id scheme 0196).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateIsR004 } from './is-r-004';

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

describe('IS-R-004 (buyer legal id scheme 0196)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateIsR004(document).passed).toEqual(true);
  });

  it('fails when both parties are Icelandic and the buyer has no legal id', async () => {
    const document = await asIcelandic(await decodeBaseExample());
    const altered = {
      ...document,
      accountingCustomerParty: {
        ...document.accountingCustomerParty,
        partyLegalEntity: { ...document.accountingCustomerParty.partyLegalEntity, companyId: undefined },
      },
    } as unknown as PeppolDocument;
    expect(validateIsR004(altered).passed).toEqual(false);
  });

  it('passes when both parties are Icelandic and the buyer has a legal id with scheme 0196', async () => {
    const document = await asIcelandic(await decodeBaseExample());
    const altered = {
      ...document,
      accountingCustomerParty: {
        ...document.accountingCustomerParty,
        partyLegalEntity: { ...document.accountingCustomerParty.partyLegalEntity, companyId: { id: '1234567890', schemeId: '0196' } },
      },
    } as unknown as PeppolDocument;
    expect(validateIsR004(altered).passed).toEqual(true);
  });
});
