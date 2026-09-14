/**
 * @description Unit tests for CEN-EN16931-BR-CO-06.
 */
import { describe, it } from '@effect/vitest';
import { Effect } from 'effect';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrCo06 } from './cen-en16931-br-co-06';

describe('CEN-EN16931-BR-CO-06', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateCenEn16931BrCo06(document);
    })
  );
});
