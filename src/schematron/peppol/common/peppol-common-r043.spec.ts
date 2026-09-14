/**
 * @description Unit tests for PEPPOL-COMMON-R043 (Belgian enterprise number, scheme 0208).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolCommonR043 } from './peppol-common-r043';

async function withEndpointId(document: PeppolDocument, schemeId: string, id: string): Promise<PeppolDocument> {
  return { ...document, accountingSupplierParty: { ...document.accountingSupplierParty, endpointId: { id, schemeId } } } as unknown as PeppolDocument;
}

describe('PEPPOL-COMMON-R043 (Belgian enterprise number, scheme 0208)', () => {
  it.effect(
    'passes when no identifier uses the checked scheme',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolCommonR043(document);
    })
  );

  it.effect(
    'passes for a valid Belgian enterprise number',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => withEndpointId(await decodeBaseExample(), '0208', '0202190461'));
      yield* validatePeppolCommonR043(document);
    })
  );

  it.effect(
    'fails for an invalid Belgian enterprise number',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => withEndpointId(await decodeBaseExample(), '0208', '1234567890'));
      const result = yield* validatePeppolCommonR043(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
