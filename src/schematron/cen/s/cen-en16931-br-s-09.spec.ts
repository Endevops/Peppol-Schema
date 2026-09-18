/**
 * @description Unit tests for CEN-EN16931-BR-S-09.
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateCenEn16931BrS09 } from './cen-en16931-br-s-09.ts';

describe('CEN-EN16931-BR-S-09', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateCenEn16931BrS09(document);
    })
  );

  it.effect(
    'fails when the rule is violated',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => (await decodeBaseExample()) as any);
      document.taxTotals[0].taxSubtotals[0].taxAmount = { ...document.taxTotals[0].taxSubtotals[0].taxAmount, value: 100 };
      const result = yield* validateCenEn16931BrS09(document).pipe(Effect.result);
      assert(Result.isFailure(result));
      if (Result.isFailure(result)) {
        const fields = result.failure.fields ?? [];
        assert(fields.length > 0);
        assert(fields[0]?.path === 'taxTotals[0].taxSubtotals[0].taxAmount.value');
        assert(fields[0]?.expected === 331.25);
        assert(fields[0]?.actual === 100);
        const operands = fields.slice(1);
        assert(operands.length === 2);
        for (const operand of operands) {
          assert(operand.expected === null);
        }
        assert(operands[0]?.path === 'taxTotals[0].taxSubtotals[0].taxableAmount.value');
        assert(operands[0]?.actual === 1325);
        assert(operands[1]?.path === 'taxTotals[0].taxSubtotals[0].taxCategory.percent');
        assert(operands[1]?.actual === 25);
      }
    })
  );
});
