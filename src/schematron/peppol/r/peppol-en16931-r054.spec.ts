/**
 * @description Unit tests for PEPPOL-EN16931-R054 (only one tax total without subtotals when tax currency).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validatePeppolEn16931R054 } from './peppol-en16931-r054.ts';

describe('PEPPOL-EN16931-R054 (only one tax total without subtotals when tax currency)', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolEn16931R054(document);
    })
  );

  it.effect(
    'fails when a tax total without subtotals is present without a tax currency code',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      const altered = {
        ...document,
        taxTotals: [...document.taxTotals, { taxAmount: { currencyId: 'USD', value: 10 }, taxSubtotals: undefined }],
      } as unknown as PeppolDocument;
      const result = yield* validatePeppolEn16931R054(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
