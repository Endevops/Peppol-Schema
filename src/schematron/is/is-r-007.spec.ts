/**
 * @description Unit tests for IS-R-007 (payment means code 42 requires 12-digit account).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';

import { decodeBaseExample } from '#/test/test-utils';

import { validateIsR007 } from './is-r-007';

async function asIcelandic(document: PeppolDocument): Promise<PeppolDocument> {
  return {
    ...document,
    accountingSupplierParty: {
      ...document.accountingSupplierParty,
      partyTaxSchemes: [{ companyId: 'IS123456789', taxSchemeId: { id: 'VAT' } }],
      postalAddress: { ...document.accountingSupplierParty.postalAddress, countryCode: { identificationCode: 'IS' } },
    },
    accountingCustomerParty: {
      ...document.accountingCustomerParty,
      partyTaxSchemes: [{ companyId: 'IS987654321', taxSchemeId: { id: 'VAT' } }],
      postalAddress: { ...document.accountingCustomerParty.postalAddress, countryCode: { identificationCode: 'IS' } },
    },
  } as unknown as PeppolDocument;
}

describe('IS-R-007 (payment means code 42 requires 12-digit account)', () => {
  it.effect(
    'passes when not applicable',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateIsR007(document);
    })
  );

  it.effect(
    'fails when an Icelandic document uses code 42 with a short account id',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asIcelandic(await decodeBaseExample()));
      const altered = {
        ...document,
        paymentMeans: [{ paymentMeansCode: { code: '42' }, payeeFinancialAccount: { id: '123' } }],
      } as unknown as PeppolDocument;
      const result = yield* validateIsR007(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'passes when an Icelandic document uses code 42 with a 12-digit account id',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asIcelandic(await decodeBaseExample()));
      const altered = {
        ...document,
        paymentMeans: [{ paymentMeansCode: { code: '42' }, payeeFinancialAccount: { id: '123456789012' } }],
      } as unknown as PeppolDocument;
      yield* validateIsR007(altered);
    })
  );
});
