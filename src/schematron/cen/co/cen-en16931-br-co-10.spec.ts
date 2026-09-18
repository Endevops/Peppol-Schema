/**
 * @description Unit tests for CEN-EN16931-BR-CO-10.
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateCenEn16931BrCo10 } from './cen-en16931-br-co-10.ts';

describe('CEN-EN16931-BR-CO-10', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateCenEn16931BrCo10(document);
    })
  );

  it.effect(
    'fails when the rule is violated',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => (await decodeBaseExample()) as any);
      document.legalMonetaryTotal.lineExtensionAmount = { ...document.legalMonetaryTotal.lineExtensionAmount, value: 1 };
      const result = yield* validateCenEn16931BrCo10(document).pipe(Effect.result);
      assert(Result.isFailure(result));
      assert(result.failure.fields.length > 0);
      assert.deepStrictEqual(result.failure.fields, [
        { path: 'legalMonetaryTotal.lineExtensionAmount.value', expected: 1300, actual: 1 },
        { path: 'invoiceLines[0].lineExtensionAmount.value', expected: null, actual: 2800 },
        { path: 'invoiceLines[1].lineExtensionAmount.value', expected: null, actual: -1500 },
      ]);
    })
  );
});
