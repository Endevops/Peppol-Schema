/**
 * @description Unit tests for PEPPOL-EN16931-R053 (only one tax total with subtotals).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolEn16931R053 } from './peppol-en16931-r053';

describe('PEPPOL-EN16931-R053 (only one tax total with subtotals)', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolEn16931R053(document);
    })
  );

  it.effect(
    'R053 should fail with two tax totals containing subtotals',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      const altered = { ...document, taxTotals: [...document.taxTotals, ...document.taxTotals] };
      const result = yield* validatePeppolEn16931R053(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'passes when there is exactly one tax total with subtotals',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolEn16931R053(document);
    })
  );

  it.effect(
    'fails when there are two tax totals with subtotals',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      const subtotal = document.taxTotals[0]?.taxSubtotals?.[0];
      const taxAmount = document.taxTotals[0]?.taxAmount;
      if (!subtotal || !taxAmount) {
        throw new Error('base example has no tax subtotal');
      }
      const altered = {
        ...document,
        taxTotals: [
          { taxAmount, taxSubtotals: [subtotal] },
          { taxAmount, taxSubtotals: [subtotal] },
        ],
      } as unknown as PeppolDocument;
      const result = yield* validatePeppolEn16931R053(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
