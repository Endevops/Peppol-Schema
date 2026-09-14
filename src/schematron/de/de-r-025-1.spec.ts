/**
 * @description Unit tests for DE-R-025-1 (direct debit requires mandate).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';

import { decodeBaseExample } from '#/test/test-utils';

import { validateDeR025_1 } from './de-r-025-1';

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

describe('DE-R-025-1 (direct debit requires mandate)', () => {
  it.effect(
    'passes when not applicable',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateDeR025_1(document);
    })
  );

  it.effect(
    'fails when a German document uses code 59 without a mandate',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asGerman(await decodeBaseExample()));
      const altered = { ...document, paymentMeans: [{ paymentMeansCode: { code: '59' }, paymentMandate: undefined }] } as unknown as PeppolDocument;
      const result = yield* validateDeR025_1(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
