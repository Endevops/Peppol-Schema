/**
 * @description Unit tests for PEPPOL-COMMON-R045 (Codice Fiscale, scheme 0210).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validatePeppolCommonR045 } from './peppol-common-r045.ts';

async function withEndpointId(document: PeppolDocument, schemeId: string, id: string): Promise<PeppolDocument> {
  return { ...document, accountingSupplierParty: { ...document.accountingSupplierParty, endpointId: { id, schemeId } } } as unknown as PeppolDocument;
}

describe('PEPPOL-COMMON-R045 (Codice Fiscale, scheme 0210)', () => {
  it.effect(
    'passes when no identifier uses the checked scheme',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolCommonR045(document);
    })
  );

  it.effect(
    'passes for a valid 16-char CF',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => withEndpointId(await decodeBaseExample(), '0210', 'RSSMRA85M01H501Z'));
      yield* validatePeppolCommonR045(document);
    })
  );

  it.effect(
    'fails for an invalid CF',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => withEndpointId(await decodeBaseExample(), '0210', 'ABC'));
      const result = yield* validatePeppolCommonR045(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
