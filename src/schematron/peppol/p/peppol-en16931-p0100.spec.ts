/**
 * @description Unit tests for PEPPOL-EN16931-P0100 (invoice type code per profile).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolEn16931P0100 } from './peppol-en16931-p0100';

describe('PEPPOL-EN16931-P0100 (invoice type code per profile)', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolEn16931P0100(document);
    })
  );

  it.effect(
    'fails when profile 01 uses an unsupported invoice type code',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      const altered = { ...document, invoiceTypeCode: '999' } as unknown as PeppolDocument;
      const result = yield* validatePeppolEn16931P0100(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
