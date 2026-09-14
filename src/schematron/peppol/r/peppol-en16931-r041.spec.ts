/**
 * @description Unit tests for PEPPOL-EN16931-R041 (base amount when percentage provided).
 */
/**
 * @effect-diagnostics nodeBuiltinImport:off
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample, decodeFixture, fixtures } from '#/test/test-utils.ts';

import { validatePeppolEn16931R041 } from './peppol-en16931-r041.ts';

describe('PEPPOL-EN16931-R041 (base amount when percentage provided)', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolEn16931R041(document);
    })
  );

  it.effect(
    'fails when a multiplier factor is present without a base amount',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      const altered = {
        ...document,
        allowanceCharges: [{ amount: { currencyId: 'EUR', value: 20 }, chargeIndicator: false, multiplierFactorNumeric: 10 }],
      } as unknown as PeppolDocument;
      const result = yield* validatePeppolEn16931R041(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'R040 should pass on the allowance example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeFixture(fixtures.allowance));
      yield* validatePeppolEn16931R041(document);
    })
  );
});
