/**
 * @description Unit tests for PEPPOL-COMMON-R041 (Norwegian org number, scheme 0192).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolCommonR041 } from './peppol-common-r041';

async function withEndpointId(document: PeppolDocument, schemeId: string, id: string): Promise<PeppolDocument> {
  return { ...document, accountingSupplierParty: { ...document.accountingSupplierParty, endpointId: { id, schemeId } } } as unknown as PeppolDocument;
}

describe('PEPPOL-COMMON-R041 (Norwegian org number, scheme 0192)', () => {
  it.effect(
    'passes when no identifier uses the checked scheme',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolCommonR041(document);
    })
  );

  it.effect(
    'fails for an invalid Norwegian org number',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => withEndpointId(await decodeBaseExample(), '0192', '123456789'));
      const result = yield* validatePeppolCommonR041(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
