/**
 * @description Unit tests for NL-R-008 (allowed payment means codes).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateNlR008 } from './nl-r-008';

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

describe('NL-R-008 (allowed payment means codes)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateNlR008(document).passed).toEqual(true);
  });

  it('fails when both parties are Dutch and an unsupported payment means code is used', async () => {
    const document = await asDutch(await decodeBaseExample());
    const altered = { ...document, paymentMeans: [{ paymentMeansCode: { code: '99' } }] } as unknown as PeppolDocument;
    expect(validateNlR008(altered).passed).toEqual(false);
  });

  it('passes when both parties are Dutch and a supported payment means code is used', async () => {
    const document = await asDutch(await decodeBaseExample());
    const altered = { ...document, paymentMeans: [{ paymentMeansCode: { code: '30' } }] } as unknown as PeppolDocument;
    expect(validateNlR008(altered).passed).toEqual(true);
  });
});
