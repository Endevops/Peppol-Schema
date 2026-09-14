/**
 * @description Unit tests for CEN-EN16931-BR-DEC-13.
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrDec13 } from './cen-en16931-br-dec-13';

describe('CEN-EN16931-BR-DEC-13', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateCenEn16931BrDec13(document);
    })
  );

  it.effect(
    'fails when the rule is violated',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => (await decodeBaseExample()) as any);
      document.taxTotals = document.taxTotals.map((total: any) => ({ ...total, taxAmount: { ...total.taxAmount, value: 331.256 } }));
      const result = yield* validateCenEn16931BrDec13(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
