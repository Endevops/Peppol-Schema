/**
 * @description Unit tests for NL-R-007 (payment means required when payment flows to supplier).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateNlR007 } from './nl-r-007';

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

describe('NL-R-007 (payment means required when payment flows to supplier)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateNlR007(document).passed).toEqual(true);
  });

  it('fails when a Dutch document has a positive payable amount and no payment means', async () => {
    const document = await asDutch(await decodeBaseExample());
    const altered = { ...document, paymentMeans: undefined } as unknown as PeppolDocument;
    expect(validateNlR007(altered).passed).toEqual(false);
  });

  it('passes when a Dutch document has a positive payable amount and payment means', async () => {
    const document = await asDutch(await decodeBaseExample());
    expect(validateNlR007(document).passed).toEqual(true);
  });
});
