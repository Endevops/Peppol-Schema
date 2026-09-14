/**
 * @description Unit tests for PEPPOL-EN16931-P0101 (credit note type code per profile).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validatePeppolEn16931P0101 } from './peppol-en16931-p0101.ts';

async function asCreditNote(document: PeppolDocument): Promise<PeppolDocument> {
  return { ...document, creditNoteLines: [{ id: '1' }], creditNoteTypeCode: '381' } as unknown as PeppolDocument;
}

describe('PEPPOL-EN16931-P0101 (credit note type code per profile)', () => {
  it.effect(
    'passes when the document is not a credit note',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolEn16931P0101(document);
    })
  );

  it.effect(
    'passes when profile 01 uses a supported credit note type code',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asCreditNote(await decodeBaseExample()));
      yield* validatePeppolEn16931P0101(document);
    })
  );

  it.effect(
    'fails when profile 01 uses an unsupported credit note type code',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asCreditNote(await decodeBaseExample()));
      const altered = { ...document, creditNoteTypeCode: '999' } as unknown as PeppolDocument;
      const result = yield* validatePeppolEn16931P0101(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'passes when the profile is not 01',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => asCreditNote(await decodeBaseExample()));
      const altered = { ...document, profileId: 'urn:fdc:peppol.eu:2017:poacc:billing:06:1.0' } as unknown as PeppolDocument;
      yield* validatePeppolEn16931P0101(altered);
    })
  );
});
