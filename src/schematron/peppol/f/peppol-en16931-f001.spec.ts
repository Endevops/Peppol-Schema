/**
 * @description Unit tests for PEPPOL-EN16931-F001 (date format).
 */
/**
 * @effect-diagnostics nodeBuiltinImport:off
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample, decodeFixture, fixtures } from '#/test/test-utils.ts';

import { validatePeppolEn16931F001 } from './peppol-en16931-f001.ts';

describe('PEPPOL-EN16931-F001 (date format)', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolEn16931F001(document);
    })
  );

  it.effect(
    'fails for a malformed date',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      const altered = { ...document, issueDate: '13-11-2017' } as unknown as PeppolDocument;
      const result = yield* validatePeppolEn16931F001(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'F001 should pass on date fixtures',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeFixture(fixtures.vatCategoryE));
      yield* validatePeppolEn16931F001(document);
    })
  );
});
