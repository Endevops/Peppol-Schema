/**
 * @description Unit tests for CEN-EN16931-BR-G-01.
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateCenEn16931BrG01 } from './cen-en16931-br-g-01.ts';

describe('CEN-EN16931-BR-G-01', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateCenEn16931BrG01(document);
    })
  );

  it.effect(
    'fails when the rule is violated',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => (await decodeBaseExample()) as any);
      document.invoiceLines[0].item.classifiedTaxCategory.id = 'G';
      const result = yield* validateCenEn16931BrG01(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
