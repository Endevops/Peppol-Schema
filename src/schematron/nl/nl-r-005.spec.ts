/**
 * @description Unit tests for NL-R-005 (Dutch customer legal entity scheme).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateNlR005 } from './nl-r-005';

async function asDutch(document: PeppolDocument): Promise<PeppolDocument> {
  return {
    ...document,
    accountingSupplierParty: {
      ...document.accountingSupplierParty,
      partyTaxSchemes: [{ companyId: 'NL123456789', taxSchemeId: { id: 'VAT' } }],
      postalAddress: { ...document.accountingSupplierParty.postalAddress, countryCode: { identificationCode: 'NL' } },
    },
    accountingCustomerParty: {
      ...document.accountingCustomerParty,
      partyTaxSchemes: [{ companyId: 'NL987654321', taxSchemeId: { id: 'VAT' } }],
      postalAddress: { ...document.accountingCustomerParty.postalAddress, countryCode: { identificationCode: 'NL' } },
    },
  } as unknown as PeppolDocument;
}

describe('NL-R-005 (Dutch customer legal entity scheme)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateNlR005(document).passed).toEqual(true);
  });

  it('fails when both parties are Dutch and the customer legal entity uses a wrong scheme', async () => {
    const document = await asDutch(await decodeBaseExample());
    const altered = {
      ...document,
      accountingCustomerParty: {
        ...document.accountingCustomerParty,
        partyLegalEntity: { ...document.accountingCustomerParty.partyLegalEntity, companyId: { id: '12345678', schemeId: '0196' } },
      },
    } as unknown as PeppolDocument;
    expect(validateNlR005(altered).passed).toEqual(false);
  });

  it('passes when both parties are Dutch and the customer legal entity uses scheme 0190', async () => {
    const document = await asDutch(await decodeBaseExample());
    const altered = {
      ...document,
      accountingCustomerParty: {
        ...document.accountingCustomerParty,
        partyLegalEntity: { ...document.accountingCustomerParty.partyLegalEntity, companyId: { id: '12345678', schemeId: '0190' } },
      },
    } as unknown as PeppolDocument;
    expect(validateNlR005(altered).passed).toEqual(true);
  });
});
