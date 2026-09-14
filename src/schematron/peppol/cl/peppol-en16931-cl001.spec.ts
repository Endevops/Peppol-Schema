/**
 * @description Unit tests for PEPPOL-EN16931-CL001 (mime code).
 */
/**
 * @effect-diagnostics nodeBuiltinImport:off
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';

import { decodeBaseExample, decodeFixture } from '#/test/test-utils';

import { validatePeppolEn16931CL001 } from './peppol-en16931-cl001';

const fixtures = {
  allowance: '#/test/files/v3/invoice/Allowance-example.xml',
  creditNote: '#/test/files/v3/credit-note/base-creditnote-correction.xml',
  negative: '#/test/files/v3/invoice/base-negative-inv-correction.xml',
  vatCategoryE: '#/test/files/v3/invoice/vat-category-E.xml',
  vatCategoryO: '#/test/files/v3/invoice/vat-category-O.xml',
} as const;

describe('PEPPOL-EN16931-CL001 (mime code)', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolEn16931CL001(document);
    })
  );

  it.effect(
    'passes for a supported mime code',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      const altered = {
        ...document,
        additionalDocumentReferences: [
          {
            id: { id: 'ref' },
            attachment: { embeddedDocumentBinaryObject: { content: 'aGVsbG8=', mimeCode: 'application/pdf', filename: 'doc.pdf' } },
          },
        ],
      } as unknown as PeppolDocument;
      yield* validatePeppolEn16931CL001(altered);
    })
  );

  it.effect(
    'fails for an unsupported mime code',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      const altered = {
        ...document,
        additionalDocumentReferences: [
          {
            id: { id: 'ref' },
            attachment: { embeddedDocumentBinaryObject: { content: 'aGVsbG8=', mimeCode: 'application/x-unknown', filename: 'doc.pdf' } },
          },
        ],
      } as unknown as PeppolDocument;
      const result = yield* validatePeppolEn16931CL001(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'CL001 should pass when there are no attachments',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeFixture(fixtures.vatCategoryO));
      yield* validatePeppolEn16931CL001(document);
    })
  );
});
