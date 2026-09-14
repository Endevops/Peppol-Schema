/**
 * @description Unit tests for PEPPOL-EN16931-P0112 (326/384 only German).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolEn16931P0112 } from './peppol-en16931-p0112';

describe('PEPPOL-EN16931-P0112 (326/384 only German)', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolEn16931P0112(document);
    })
  );

  it.effect(
    'fails when invoice type 384 is used without German parties',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      const altered = { ...document, invoiceTypeCode: '384' } as unknown as PeppolDocument;
      const result = yield* validatePeppolEn16931P0112(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
