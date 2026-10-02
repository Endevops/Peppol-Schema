/**
 * @description Unit tests for IS-R-005 (buyer address).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateIsR005 } from './is-r-005.ts';

async function asIcelandic(document: PeppolDocument): Promise<PeppolDocument> {
  return {
    ...document,
    accountingSupplierParty: {
      party: {
        ...document.accountingSupplierParty.party,
        partyTaxSchemes: [{ companyId: 'IS123456789', taxSchemeId: { id: 'VAT' } }],
        postalAddress: { ...document.accountingSupplierParty.party.postalAddress, countryCode: { identificationCode: 'IS' } },
      },
    },
    accountingCustomerParty: {
      party: {
        ...document.accountingCustomerParty.party,
        partyTaxSchemes: [{ companyId: 'IS987654321', taxSchemeId: { id: 'VAT' } }],
        postalAddress: { ...document.accountingCustomerParty.party.postalAddress, countryCode: { identificationCode: 'IS' } },
      },
    },
  } as unknown as PeppolDocument;
}

describe('IS-R-005 (buyer address)', () => {
  it.effect(
    'passes when not applicable',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateIsR005(document);
    })
  );

  it.effect(
    'fails when both parties are Icelandic and the buyer has no street',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asIcelandic(await decodeBaseExample()));
      const altered = {
        ...document,
        accountingCustomerParty: {
          party: {
            ...document.accountingCustomerParty.party,
            postalAddress: { ...document.accountingCustomerParty.party.postalAddress, streetName: undefined },
          },
        },
      } as unknown as PeppolDocument;
      const result = yield* validateIsR005(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'passes when both parties are Icelandic and the buyer has a complete address',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asIcelandic(await decodeBaseExample()));
      yield* validateIsR005(document);
    })
  );
});
