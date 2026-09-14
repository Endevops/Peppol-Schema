/**
 * @description Unit tests for CEN-EN16931-BR-DEC-17.
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateCenEn16931BrDec17 } from './cen-en16931-br-dec-17.ts';

describe('CEN-EN16931-BR-DEC-17', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateCenEn16931BrDec17(document);
    })
  );

  it.effect(
    'fails when the rule is violated',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => (await decodeBaseExample()) as any);
      document.legalMonetaryTotal.payableRoundingAmount = { currencyId: 'EUR', value: 1.234 };
      const result = yield* validateCenEn16931BrDec17(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
