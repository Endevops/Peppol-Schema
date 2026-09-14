/**
 * @description Unit tests for PEPPOL-EN16931-CL006 (invoice period description code).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validatePeppolEn16931CL006 } from './peppol-en16931-cl006.ts';

describe('PEPPOL-EN16931-CL006 (invoice period description code)', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolEn16931CL006(document);
    })
  );

  it.effect(
    'fails for an unsupported description code',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      const altered = { ...document, invoicePeriod: { descriptionCode: '999' } } as unknown as PeppolDocument;
      const result = yield* validatePeppolEn16931CL006(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
