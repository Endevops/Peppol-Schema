/**
 * @description Unit tests for CEN-EN16931-BR-DEC-14.
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateCenEn16931BrDec14 } from './cen-en16931-br-dec-14.ts';

describe('CEN-EN16931-BR-DEC-14', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateCenEn16931BrDec14(document);
    })
  );

  it.effect(
    'fails when the rule is violated',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => (await decodeBaseExample()) as any);
      document.legalMonetaryTotal.taxInclusiveAmount = { ...document.legalMonetaryTotal.taxInclusiveAmount, value: 1.234 };
      const result = yield* validateCenEn16931BrDec14(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
