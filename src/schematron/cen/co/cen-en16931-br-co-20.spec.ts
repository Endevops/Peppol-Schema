/**
 * @description Unit tests for CEN-EN16931-BR-CO-20.
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrCo20 } from './cen-en16931-br-co-20';

describe('CEN-EN16931-BR-CO-20', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateCenEn16931BrCo20(document);
    })
  );

  it.effect(
    'fails when the rule is violated',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => (await decodeBaseExample()) as any);
      document.invoiceLines[0].invoicePeriod = { startDate: undefined, endDate: undefined };
      const result = yield* validateCenEn16931BrCo20(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
