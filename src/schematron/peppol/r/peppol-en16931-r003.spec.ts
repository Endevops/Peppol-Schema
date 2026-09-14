/**
 * @description Unit tests for PEPPOL-EN16931-R003 (buyer reference or purchase order reference).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolEn16931R003 } from './peppol-en16931-r003';

describe('PEPPOL-EN16931-R003 (buyer reference or purchase order reference)', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolEn16931R003(document);
    })
  );

  it.effect(
    'fails when neither buyerReference nor orderReference is provided',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      const altered = { ...document, buyerReference: undefined, orderReference: undefined } as unknown as PeppolDocument;
      const result = yield* validatePeppolEn16931R003(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
