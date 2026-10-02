/**
 * @description Unit tests for DE-R-028 (seller email format).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateDeR028 } from './de-r-028.ts';

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

describe('DE-R-028 (seller email format)', () => {
  it.effect(
    'passes when not applicable',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateDeR028(document);
    })
  );

  it.effect(
    'fails when a German document has an invalid seller email',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asGerman(await decodeBaseExample()));
      const altered = {
        ...document,
        accountingSupplierParty: {
          party: {
            ...document.accountingSupplierParty.party,
            contact: { ...document.accountingSupplierParty.party.contact, electronicMail: 'not-an-email' },
          },
        },
      } as unknown as PeppolDocument;
      const result = yield* validateDeR028(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
