/**
 * @description Unit tests for PEPPOL-EN16931-R040 (amount = base amount * percentage/100).
 */
/**
 * @effect-diagnostics nodeBuiltinImport:off
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample, decodeFixture, fixtures } from '#/test/test-utils.ts';

import { validatePeppolEn16931R040 } from './peppol-en16931-r040.ts';

describe('PEPPOL-EN16931-R040 (amount = base amount * percentage/100)', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolEn16931R040(document);
    })
  );

  it.effect(
    'fails when amount does not match base amount * percentage/100',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      const altered = {
        ...document,
        allowanceCharges: [
          {
            amount: { currencyId: 'EUR', value: 100 },
            baseAmount: { currencyId: 'EUR', value: 200 },
            chargeIndicator: false,
            multiplierFactorNumeric: 10,
          },
        ],
      } as unknown as PeppolDocument;
      const result = yield* validatePeppolEn16931R040(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
      if (Result.isFailure(result)) {
        const fields = result.failure.fields ?? [];
        assert(fields.length > 0);
        assert(fields[0]?.path === 'allowanceCharges[0].amount.value');
        assert(fields[0]?.expected === 20);
        assert(fields[0]?.actual === 100);
        const operands = fields.slice(1);
        assert(operands.length === 2);
        for (const operand of operands) {
          assert(operand.expected === null);
        }
        assert(operands[0]?.path === 'allowanceCharges[0].baseAmount.value');
        assert(operands[0]?.actual === 200);
        assert(operands[1]?.path === 'allowanceCharges[0].multiplierFactorNumeric');
        assert(operands[1]?.actual === 10);
      }
    })
  );

  it.effect(
    'R040 should pass on the allowance example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeFixture(fixtures.allowance));
      yield* validatePeppolEn16931R040(document);
    })
  );
});
