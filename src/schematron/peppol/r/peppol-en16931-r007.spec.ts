/**
 * @description Unit tests for PEPPOL-EN16931-R007 (business process format).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolEn16931R007 } from './peppol-en16931-r007';

describe('PEPPOL-EN16931-R007 (business process format)', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolEn16931R007(document);
    })
  );

  it.effect(
    'fails when profileId does not match the expected format',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      const altered = { ...document, profileId: 'not-a-valid-profile' } as unknown as PeppolDocument;
      const result = yield* validatePeppolEn16931R007(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
