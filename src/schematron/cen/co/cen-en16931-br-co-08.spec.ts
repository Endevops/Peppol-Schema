/**
 * @description Unit tests for CEN-EN16931-BR-CO-08.
 */
import { describe, it } from '@effect/vitest';
import { Effect } from 'effect';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrCo08 } from './cen-en16931-br-co-08';

describe('CEN-EN16931-BR-CO-08', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateCenEn16931BrCo08(document);
    })
  );
});
