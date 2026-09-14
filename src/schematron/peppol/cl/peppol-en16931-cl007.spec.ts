/**
 * @description Unit tests for PEPPOL-EN16931-CL007 (currency code).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validatePeppolEn16931CL007 } from './peppol-en16931-cl007.ts';

describe('PEPPOL-EN16931-CL007 (currency code)', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolEn16931CL007(document);
    })
  );

  it.effect(
    'fails for an unsupported currency code',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      const altered = { ...document, documentCurrencyCode: 'XYZ' } as unknown as PeppolDocument;
      const result = yield* validatePeppolEn16931CL007(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
