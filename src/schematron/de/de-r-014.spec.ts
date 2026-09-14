/**
 * @description Unit tests for DE-R-014 (VAT category rate).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateDeR014 } from './de-r-014.ts';

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

describe('DE-R-014 (VAT category rate)', () => {
  it.effect(
    'passes when not applicable',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateDeR014(document);
    })
  );

  it.effect(
    'fails when a German document has a tax subtotal without a VAT rate',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asGerman(await decodeBaseExample()));
      const subtotal = document.taxTotals[0]?.taxSubtotals?.[0];
      if (!subtotal) {
        throw new Error('base example has no tax subtotal');
      }
      const altered = {
        ...document,
        taxTotals: [
          {
            taxAmount: document.taxTotals[0]?.taxAmount,
            taxSubtotals: [{ ...subtotal, taxCategory: { ...subtotal.taxCategory, percent: undefined } }],
          },
        ],
      } as unknown as PeppolDocument;
      const result = yield* validateDeR014(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
