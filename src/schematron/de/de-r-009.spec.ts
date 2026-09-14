/**
 * @description Unit tests for DE-R-009 (buyer post code).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';

import { decodeBaseExample } from '#/test/test-utils';

import { validateDeR009 } from './de-r-009';

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

describe('DE-R-009 (buyer post code)', () => {
  it.effect(
    'passes when not applicable',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateDeR009(document);
    })
  );

  it.effect(
    'fails when a German document has no buyer post code',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asGerman(await decodeBaseExample()));
      const altered = {
        ...document,
        accountingCustomerParty: {
          ...document.accountingCustomerParty,
          postalAddress: { ...document.accountingCustomerParty.postalAddress, postalZone: undefined },
        },
      } as unknown as PeppolDocument;
      const result = yield* validateDeR009(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
