/**
 * @description Unit tests for PEPPOL-COMMON-R049 (Swedish org number, scheme 0007).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validatePeppolCommonR049 } from './peppol-common-r049.ts';

async function withEndpointId(document: PeppolDocument, schemeId: string, id: string): Promise<PeppolDocument> {
  return { ...document, accountingSupplierParty: { ...document.accountingSupplierParty, endpointId: { id, schemeId } } } as unknown as PeppolDocument;
}

describe('PEPPOL-COMMON-R049 (Swedish org number, scheme 0007)', () => {
  it.effect(
    'passes when no identifier uses the checked scheme',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolCommonR049(document);
    })
  );

  it.effect(
    'passes for a valid Swedish org number',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => withEndpointId(await decodeBaseExample(), '0007', '5561234567'));
      yield* validatePeppolCommonR049(document);
    })
  );

  it.effect(
    'fails for an invalid Swedish org number',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => withEndpointId(await decodeBaseExample(), '0007', '123'));
      const result = yield* validatePeppolCommonR049(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
