/**
 * @description Unit tests for PEPPOL-EN16931-R004 (specification identifier).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validatePeppolEn16931R004 } from './peppol-en16931-r004.ts';

describe('PEPPOL-EN16931-R004 (specification identifier)', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolEn16931R004(document);
    })
  );

  it.effect(
    'R004 should fail when customizationId has a wrong prefix',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      const result = yield* validatePeppolEn16931R004({ ...document, customizationId: 'urn:wrong' }).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'passes when the customization id matches the compliant prefix',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolEn16931R004(document);
    })
  );

  it.effect(
    'fails when the customization id does not match the compliant prefix',
    Effect.fn(function* () {
      const document = yield* Effect.promise(
        async () => ({ ...(await decodeBaseExample()), customizationId: 'urn:something-else' }) as unknown as PeppolDocument
      );
      const result = yield* validatePeppolEn16931R004(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
