/**
 * @description Unit tests for GR-R-008-2 (no more than one invoice url).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateGrR008_2 } from './gr-r-008-2.ts';

async function withCountry(
  document: PeppolDocument,
  supplierCountry: string,
  customerCountry: string,
  supplierVatPrefix = `${supplierCountry}VAT123456789`,
  customerVatPrefix = `${customerCountry}VAT123456789`
): Promise<PeppolDocument> {
  return {
    ...document,
    accountingSupplierParty: {
      ...document.accountingSupplierParty,
      partyTaxSchemes: [{ companyId: supplierVatPrefix, taxSchemeId: { id: 'VAT' } }],
      postalAddress: { ...document.accountingSupplierParty.postalAddress, countryCode: { identificationCode: supplierCountry } },
    },
    accountingCustomerParty: {
      ...document.accountingCustomerParty,
      partyTaxSchemes: [{ companyId: customerVatPrefix, taxSchemeId: { id: 'VAT' } }],
      postalAddress: { ...document.accountingCustomerParty.postalAddress, countryCode: { identificationCode: customerCountry } },
    },
  } as unknown as PeppolDocument;
}

describe('GR-R-008-2 (no more than one invoice url)', () => {
  it.effect(
    'passes when not applicable',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateGrR008_2(document);
    })
  );

  it.effect(
    'fails when a Greek supplier has two invoice urls',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => withCountry(await decodeBaseExample(), 'GR', 'BE'));
      const altered = {
        ...document,
        additionalDocumentReferences: [
          { id: { id: 'a' }, documentDescription: '##INVOICE|URL##' },
          { id: { id: 'b' }, documentDescription: '##INVOICE|URL##' },
        ],
      } as unknown as PeppolDocument;
      const result = yield* validateGrR008_2(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
