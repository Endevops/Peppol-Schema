/**
 * @description Unit tests for CEN-EN16931-BR-S-10.
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateCenEn16931BrS10 } from './cen-en16931-br-s-10.ts';

describe('CEN-EN16931-BR-S-10', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateCenEn16931BrS10(document);
    })
  );

  it.effect(
    'fails when the rule is violated',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => (await decodeBaseExample()) as any);
      document.taxTotals[0].taxSubtotals[0].taxCategory.taxExemptionReason = 'Exempt';
      const result = yield* validateCenEn16931BrS10(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
