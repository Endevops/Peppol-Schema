/**
 * @description Unit tests for DE-R-005 (seller contact point).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateDeR005 } from './de-r-005.ts';

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

describe('DE-R-005 (seller contact point)', () => {
  it.effect(
    'passes when not applicable',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateDeR005(document);
    })
  );

  it.effect(
    'fails when a German document has no seller contact name',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asGerman(await decodeBaseExample()));
      const altered = {
        ...document,
        accountingSupplierParty: {
          party: { ...document.accountingSupplierParty.party, contact: { ...document.accountingSupplierParty.party.contact, name: undefined } },
        },
      } as unknown as PeppolDocument;
      const result = yield* validateDeR005(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
