/**
 * @description Unit tests for PEPPOL-EN16931-CL008 (electronic address scheme).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validatePeppolEn16931CL008 } from './peppol-en16931-cl008.ts';

describe('PEPPOL-EN16931-CL008 (electronic address scheme)', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolEn16931CL008(document);
    })
  );

  it.effect(
    'fails for an unsupported scheme ID',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      const altered = {
        ...document,
        accountingSupplierParty: { ...document.accountingSupplierParty, endpointId: { id: '123', schemeId: '9999' } },
      } as unknown as PeppolDocument;
      const result = yield* validatePeppolEn16931CL008(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
