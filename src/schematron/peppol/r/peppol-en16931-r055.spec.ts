/**
 * @description Unit tests for PEPPOL-EN16931-R055 (same operational sign for VAT amounts).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolEn16931R055 } from './peppol-en16931-r055';

describe('PEPPOL-EN16931-R055 (same operational sign for VAT amounts)', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolEn16931R055(document);
    })
  );

  it.effect(
    'fails when the document currency and tax currency amounts have different signs',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      const altered = {
        ...document,
        taxCurrencyCode: 'USD',
        taxTotals: [
          { taxAmount: { currencyId: 'EUR', value: 100 }, taxSubtotals: [] },
          { taxAmount: { currencyId: 'USD', value: -100 }, taxSubtotals: [] },
        ],
      } as unknown as PeppolDocument;
      const result = yield* validatePeppolEn16931R055(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
