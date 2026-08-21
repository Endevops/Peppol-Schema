/**
 * @description Unit tests for DE-R-030 (direct debit requires SEPA creditor id).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateDeR030 } from './de-r-030';

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

describe('DE-R-030 (direct debit requires SEPA creditor id)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateDeR030(document).passed).toEqual(true);
  });

  it('fails when a German document has a payment mandate without a SEPA creditor id', async () => {
    const document = await asGerman(await decodeBaseExample());
    const altered = {
      ...document,
      paymentMeans: [{ paymentMeansCode: { code: '59' }, paymentMandate: { id: 'MANDATE-1' } }],
    } as unknown as PeppolDocument;
    expect(validateDeR030(altered).passed).toEqual(false);
  });

  it('passes when a German document has a payment mandate and a SEPA creditor id', async () => {
    const document = await asGerman(await decodeBaseExample());
    const altered = {
      ...document,
      accountingSupplierParty: { ...document.accountingSupplierParty, partyIdentification: { id: { id: 'SEPA-CREDITOR', schemeId: 'SEPA' } } },
      paymentMeans: [{ paymentMeansCode: { code: '59' }, paymentMandate: { id: 'MANDATE-1' } }],
    } as unknown as PeppolDocument;
    expect(validateDeR030(altered).passed).toEqual(true);
  });
});
