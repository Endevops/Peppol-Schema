/**
 * @description Unit tests for CEN-EN16931-BR-13.
 */
import { describe, it } from '@effect/vitest';
import { Effect } from 'effect';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validateCenEn16931Br13 } from './cen-en16931-br-13.ts';

describe('CEN-EN16931-BR-13', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validateCenEn16931Br13(document);
    })
  );
});
