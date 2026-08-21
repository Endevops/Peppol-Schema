/**
 * @description Unit tests for NL-R-006 (Dutch tax representative address).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateNlR006 } from './nl-r-006';

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

describe('NL-R-006 (Dutch tax representative address)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateNlR006(document).passed).toEqual(true);
  });

  it('fails when a Dutch document has a Dutch tax representative without a post code', async () => {
    const document = await asDutch(await decodeBaseExample());
    const altered = {
      ...document,
      taxRepresentativeParty: {
        name: 'Tax Rep',
        partyTaxScheme: { companyId: 'NL123', taxSchemeId: { id: 'VAT' } },
        postalAddress: { streetName: 'Street 1', cityName: 'Amsterdam', postalZone: undefined, countryCode: { identificationCode: 'NL' } },
      },
    } as unknown as PeppolDocument;
    expect(validateNlR006(altered).passed).toEqual(false);
  });
});
