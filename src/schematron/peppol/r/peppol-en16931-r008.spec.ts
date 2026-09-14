/**
 * @description Unit tests for PEPPOL-EN16931-R008 (no empty elements).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolEn16931R008 } from './peppol-en16931-r008';

describe('PEPPOL-EN16931-R008 (no empty elements)', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolEn16931R008(document);
    })
  );

  it.effect(
    'fails when the document contains an empty element',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      const altered = { ...document, buyerReference: '   ' } as unknown as PeppolDocument;
      const result = yield* validatePeppolEn16931R008(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
