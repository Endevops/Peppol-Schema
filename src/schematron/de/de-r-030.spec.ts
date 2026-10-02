/**
 * @description Unit tests for DE-R-030 (direct debit requires SEPA creditor id).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateDeR030 } from './de-r-030.ts';

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

describe('DE-R-030 (direct debit requires SEPA creditor id)', () => {
  it.effect(
    'passes when not applicable',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateDeR030(document);
    })
  );

  it.effect(
    'fails when a German document has a payment mandate without a SEPA creditor id',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asGerman(await decodeBaseExample()));
      const altered = {
        ...document,
        paymentMeans: [{ paymentMeansCode: { code: '59' }, paymentMandate: { id: 'MANDATE-1' } }],
      } as unknown as PeppolDocument;
      const result = yield* validateDeR030(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'passes when a German document has a payment mandate and a SEPA creditor id',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asGerman(await decodeBaseExample()));
      const altered = {
        ...document,
        accountingSupplierParty: {
          party: { ...document.accountingSupplierParty.party, partyIdentification: { id: { id: 'SEPA-CREDITOR', schemeId: 'SEPA' } } },
        },
        paymentMeans: [{ paymentMeansCode: { code: '59' }, paymentMandate: { id: 'MANDATE-1' } }],
      } as unknown as PeppolDocument;
      yield* validateDeR030(altered);
    })
  );
});
