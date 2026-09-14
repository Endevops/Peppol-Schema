/**
 * @description Unit tests for CEN-EN16931-BR-CO-03.
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateCenEn16931BrCo03 } from './cen-en16931-br-co-03.ts';

describe('CEN-EN16931-BR-CO-03', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateCenEn16931BrCo03(document);
    })
  );

  it.effect(
    'fails when the rule is violated',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => (await decodeBaseExample()) as any);
      document.taxPointDate = '2017-11-13';
      document.invoicePeriod = { descriptionCode: '35', startDate: undefined, endDate: undefined };
      const result = yield* validateCenEn16931BrCo03(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
