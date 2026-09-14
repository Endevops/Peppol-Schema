/**
 * @description Unit tests for DE-R-024-1 (card code requires card account).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';

import { decodeBaseExample } from '#/test/test-utils';

import { validateDeR024_1 } from './de-r-024-1';

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

describe('DE-R-024-1 (card code requires card account)', () => {
  it.effect(
    'passes when not applicable',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateDeR024_1(document);
    })
  );

  it.effect(
    'fails when a German document uses code 48 without a card account',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asGerman(await decodeBaseExample()));
      const altered = { ...document, paymentMeans: [{ paymentMeansCode: { code: '48' }, cardAccount: undefined }] } as unknown as PeppolDocument;
      const result = yield* validateDeR024_1(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
