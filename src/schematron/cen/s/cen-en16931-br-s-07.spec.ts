/**
 * @description Unit tests for CEN-EN16931-BR-S-07.
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateCenEn16931BrS07 } from './cen-en16931-br-s-07.ts';

describe('CEN-EN16931-BR-S-07', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateCenEn16931BrS07(document);
    })
  );

  it.effect(
    'fails when the rule is violated',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => (await decodeBaseExample()) as any);
      document.allowanceCharges = document.allowanceCharges.map((ac: any) => ({ ...ac, taxCategory: { ...ac.taxCategory, percent: 0 } }));
      const result = yield* validateCenEn16931BrS07(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
