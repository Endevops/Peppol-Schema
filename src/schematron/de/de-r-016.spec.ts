/**
 * @description Unit tests for DE-R-016 (VAT codes require seller tax id).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateDeR016 } from './de-r-016';

async function asGerman(document: PeppolDocument): Promise<PeppolDocument> {
  return {
    ...document,
    accountingSupplierParty: {
      ...document.accountingSupplierParty,
      postalAddress: { ...document.accountingSupplierParty.postalAddress, countryCode: { identificationCode: 'DE' } },
    },
    accountingCustomerParty: {
      ...document.accountingCustomerParty,
      postalAddress: { ...document.accountingCustomerParty.postalAddress, countryCode: { identificationCode: 'DE' } },
    },
  } as unknown as PeppolDocument;
}

describe('DE-R-016 (VAT codes require seller tax id)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateDeR016(document).passed).toEqual(true);
  });

  it('fails when a German document uses VAT code S without a seller tax identifier', async () => {
    const document = await asGerman(await decodeBaseExample());
    const altered = {
      ...document,
      accountingSupplierParty: { ...document.accountingSupplierParty, partyTaxSchemes: undefined },
    } as unknown as PeppolDocument;
    expect(validateDeR016(altered).passed).toEqual(false);
  });

  it('passes when a German document uses VAT code S with a seller tax identifier', async () => {
    const document = await asGerman(await decodeBaseExample());
    const altered = {
      ...document,
      accountingSupplierParty: { ...document.accountingSupplierParty, partyTaxSchemes: [{ companyId: 'DE123456789', taxSchemeId: { id: 'VAT' } }] },
    } as unknown as PeppolDocument;
    expect(validateDeR016(altered).passed).toEqual(true);
  });
});
