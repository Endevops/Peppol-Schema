/**
 * @description Unit tests for DK-R-013 (schemeID for party identification).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateDkR013 } from './dk-r-013.ts';

async function asDanish(document: PeppolDocument): Promise<PeppolDocument> {
  return {
    ...document,
    accountingSupplierParty: {
      ...document.accountingSupplierParty,
      partyTaxSchemes: [{ companyId: 'DK12345678', taxSchemeId: { id: 'VAT' } }],
      postalAddress: { ...document.accountingSupplierParty.postalAddress, countryCode: { identificationCode: 'DK' } },
    },
    accountingCustomerParty: {
      ...document.accountingCustomerParty,
      partyTaxSchemes: [{ companyId: 'DK87654321', taxSchemeId: { id: 'VAT' } }],
      postalAddress: { ...document.accountingCustomerParty.postalAddress, countryCode: { identificationCode: 'DK' } },
    },
  } as unknown as PeppolDocument;
}

describe('DK-R-013 (schemeID for party identification)', () => {
  it.effect(
    'passes when not applicable',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateDkR013(document);
    })
  );

  it.effect(
    'fails when a Danish document has a party identification without a scheme id',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asDanish(await decodeBaseExample()));
      const altered = {
        ...document,
        accountingSupplierParty: { ...document.accountingSupplierParty, partyIdentification: { id: { id: '12345678', schemeId: undefined } } },
      } as unknown as PeppolDocument;
      const result = yield* validateDkR013(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'passes when a Danish document has a party identification with a scheme id',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asDanish(await decodeBaseExample()));
      const altered = {
        ...document,
        accountingSupplierParty: { ...document.accountingSupplierParty, partyIdentification: { id: { id: '12345678', schemeId: '0088' } } },
      } as unknown as PeppolDocument;
      yield* validateDkR013(altered);
    })
  );
});
