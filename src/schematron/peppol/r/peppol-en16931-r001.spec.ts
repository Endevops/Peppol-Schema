/**
 * @description Unit tests for PEPPOL-EN16931-R001.
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validatePeppolEn16931R001 } from './peppol-en16931-r001.ts';

describe('PEPPOL-EN16931-R001', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolEn16931R001(document);
    })
  );

  it.effect(
    'passes when the business process is provided',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolEn16931R001(document);
    })
  );

  it.effect(
    'fails when the business process is empty',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => ({ ...(await decodeBaseExample()), profileId: '' }));
      const result = yield* validatePeppolEn16931R001(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'fails when the business process is missing',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => ({ ...(await decodeBaseExample()), profileId: undefined }) as unknown as PeppolDocument);
      const result = yield* validatePeppolEn16931R001(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
