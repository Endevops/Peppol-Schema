/**
 * @description Unit tests for DE-R-023-2 (credit transfer forbids card and mandate).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';

import { decodeBaseExample } from '#/test/test-utils';

import { validateDeR023_2 } from './de-r-023-2';

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

describe('DE-R-023-2 (credit transfer forbids card and mandate)', () => {
  it.effect(
    'passes when not applicable',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateDeR023_2(document);
    })
  );

  it.effect(
    'fails when a German document uses code 58 with a card account',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asGerman(await decodeBaseExample()));
      const altered = {
        ...document,
        paymentMeans: [{ paymentMeansCode: { code: '58' }, cardAccount: { networkId: 'VISA', primaryAccountNumberId: '1234' } }],
      } as unknown as PeppolDocument;
      const result = yield* validateDeR023_2(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
