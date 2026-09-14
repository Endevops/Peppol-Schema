/**
 * @description Unit tests for PEPPOL-COMMON-R040 (GLN, scheme 0088).
 *
 * @effect-diagnostics nodeBuiltinImport:off
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample, decodeFixture, fixtures } from '#/test/test-utils.ts';

import { validatePeppolCommonR040 } from './peppol-common-r040.ts';

async function withEndpointId(document: PeppolDocument, schemeId: string, id: string): Promise<PeppolDocument> {
  return { ...document, accountingSupplierParty: { ...document.accountingSupplierParty, endpointId: { id, schemeId } } } as unknown as PeppolDocument;
}

describe('PEPPOL-COMMON-R040 (GLN, scheme 0088)', () => {
  it.effect(
    'passes when no identifier uses the checked scheme',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolCommonR040(document);
    })
  );

  it.effect(
    'passes for a valid GLN',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => withEndpointId(await decodeBaseExample(), '0088', '9482348239847239874'));
      yield* validatePeppolCommonR040(document);
    })
  );

  it.effect(
    'fails for an invalid GLN',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => withEndpointId(await decodeBaseExample(), '0088', '1234567890123'));
      const result = yield* validatePeppolCommonR040(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'PEPPOL-COMMON-R040 should pass when no GLN identifiers are present',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeFixture(fixtures.creditNote));
      yield* validatePeppolCommonR040(document);
    })
  );
});
