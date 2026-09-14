/**
 * @description Unit tests for DK-R-007 (mandate for code 49).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateDkR007 } from './dk-r-007.ts';

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

describe('DK-R-007 (mandate for code 49)', () => {
  it.effect(
    'passes when not applicable',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateDkR007(document);
    })
  );

  it.effect(
    'fails when a Danish document uses code 49 without a mandate id',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asDanish(await decodeBaseExample()));
      const altered = {
        ...document,
        paymentMeans: [{ paymentMeansCode: { code: '49' }, paymentMandate: { id: undefined, payerFinancialAccountId: { id: '123' } } }],
      } as unknown as PeppolDocument;
      const result = yield* validateDkR007(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
