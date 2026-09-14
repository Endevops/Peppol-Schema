/**
 * @description Unit tests for PEPPOL-EN16931-R005 (VAT accounting currency differs from invoice currency).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolEn16931R005 } from './peppol-en16931-r005';

describe('PEPPOL-EN16931-R005 (VAT accounting currency differs from invoice currency)', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolEn16931R005(document);
    })
  );

  it.effect(
    'fails when taxCurrencyCode equals documentCurrencyCode',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      const altered = { ...document, taxCurrencyCode: document.documentCurrencyCode } as unknown as PeppolDocument;
      const result = yield* validatePeppolEn16931R005(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
