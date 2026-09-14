/**
 * @description Unit tests for DE-R-026 (code 384 requires preceding invoice reference).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';

import { decodeBaseExample } from '#/test/test-utils';

import { validateDeR026 } from './de-r-026';

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

describe('DE-R-026 (code 384 requires preceding invoice reference)', () => {
  it.effect(
    'passes when not applicable',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateDeR026(document);
    })
  );

  it.effect(
    'fails when a German document uses invoice type 384 without a billing reference',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asGerman(await decodeBaseExample()));
      const altered = { ...document, invoiceTypeCode: '384', billingReferences: undefined } as unknown as PeppolDocument;
      const result = yield* validateDeR026(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
