/**
 * @description Unit tests for DK-R-008 (giro payment id and account).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';

import { decodeBaseExample } from '#/test/test-utils';

import { validateDkR008 } from './dk-r-008';

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

describe('DK-R-008 (giro payment id and account)', () => {
  it.effect(
    'passes when not applicable',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateDkR008(document);
    })
  );

  it.effect(
    'fails when a Danish document uses code 50 with a wrong payment id prefix',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asDanish(await decodeBaseExample()));
      const altered = {
        ...document,
        paymentMeans: [{ paymentMeansCode: { code: '50' }, paymentId: '99#123', payeeFinancialAccount: { id: '1234567' } }],
      } as unknown as PeppolDocument;
      const result = yield* validateDkR008(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'passes when a Danish document uses code 50 with a valid payment id',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asDanish(await decodeBaseExample()));
      const altered = {
        ...document,
        paymentMeans: [{ paymentMeansCode: { code: '50' }, paymentId: '01#123', payeeFinancialAccount: { id: '1234567' } }],
      } as unknown as PeppolDocument;
      yield* validateDkR008(altered);
    })
  );
});
