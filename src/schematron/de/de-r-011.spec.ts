/**
 * @description Unit tests for DE-R-011 (deliver to post code).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateDeR011 } from './de-r-011.ts';

async function asGerman(document: PeppolDocument): Promise<PeppolDocument> {
  return {
    ...document,
    accountingSupplierParty: {
      party: {
        ...document.accountingSupplierParty.party,
        postalAddress: { ...document.accountingSupplierParty.party.postalAddress, countryCode: { identificationCode: 'DE' } },
      },
    },
    accountingCustomerParty: {
      party: {
        ...document.accountingCustomerParty.party,
        postalAddress: { ...document.accountingCustomerParty.party.postalAddress, countryCode: { identificationCode: 'DE' } },
      },
    },
  } as unknown as PeppolDocument;
}

describe('DE-R-011 (deliver to post code)', () => {
  it.effect(
    'passes when not applicable',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateDeR011(document);
    })
  );

  it.effect(
    'fails when a German document has a delivery address without a post code',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asGerman(await decodeBaseExample()));
      const altered = {
        ...document,
        delivery: { deliveryLocation: { address: { ...document.accountingSupplierParty.party.postalAddress, postalZone: undefined } } },
      } as unknown as PeppolDocument;
      const result = yield* validateDeR011(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
