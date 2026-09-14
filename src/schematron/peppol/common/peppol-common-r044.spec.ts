/**
 * @description Unit tests for PEPPOL-COMMON-R044 (IPA code, scheme 0201).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolCommonR044 } from './peppol-common-r044';

async function withEndpointId(document: PeppolDocument, schemeId: string, id: string): Promise<PeppolDocument> {
  return { ...document, accountingSupplierParty: { ...document.accountingSupplierParty, endpointId: { id, schemeId } } } as unknown as PeppolDocument;
}

describe('PEPPOL-COMMON-R044 (IPA code, scheme 0201)', () => {
  it.effect(
    'passes when no identifier uses the checked scheme',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolCommonR044(document);
    })
  );

  it.effect(
    'passes for a valid 6-char IPA code',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => withEndpointId(await decodeBaseExample(), '0201', 'ABC123'));
      yield* validatePeppolCommonR044(document);
    })
  );

  it.effect(
    'fails for an invalid IPA code',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => withEndpointId(await decodeBaseExample(), '0201', 'AB'));
      const result = yield* validatePeppolCommonR044(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
