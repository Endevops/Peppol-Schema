/**
 * @description Unit tests for CEN-EN16931-BR-CO-05.
 */
import { describe, it } from '@effect/vitest';
import { Effect } from 'effect';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateCenEn16931BrCo05 } from './cen-en16931-br-co-05.ts';

describe('CEN-EN16931-BR-CO-05', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateCenEn16931BrCo05(document);
    })
  );
});
