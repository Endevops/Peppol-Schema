/**
 * @description Unit tests for PEPPOL-EN16931-R042 (percentage when base amount provided).
 */
/**
 * @effect-diagnostics nodeBuiltinImport:off
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';

import { decodeBaseExample, decodeFixture, fixtures } from '#/test/test-utils';

import { validatePeppolEn16931R042 } from './peppol-en16931-r042';

describe('PEPPOL-EN16931-R042 (percentage when base amount provided)', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolEn16931R042(document);
    })
  );

  it.effect(
    'fails when a base amount is present without a multiplier factor',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      const altered = {
        ...document,
        allowanceCharges: [{ amount: { currencyId: 'EUR', value: 20 }, baseAmount: { currencyId: 'EUR', value: 200 }, chargeIndicator: false }],
      } as unknown as PeppolDocument;
      const result = yield* validatePeppolEn16931R042(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'R040 should pass on the allowance example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeFixture(fixtures.allowance));
      yield* validatePeppolEn16931R042(document);
    })
  );
});
