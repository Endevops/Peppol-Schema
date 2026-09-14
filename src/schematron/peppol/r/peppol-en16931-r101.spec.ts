/**
 * @description Unit tests for PEPPOL-EN16931-R101 (document reference only with code 130).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validatePeppolEn16931R101 } from './peppol-en16931-r101.ts';

describe('PEPPOL-EN16931-R101 (document reference only with code 130)', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolEn16931R101(document);
    })
  );

  it.effect(
    'fails when a document reference uses a code other than 130',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      const lines = (document as PeppolDocument & { invoiceLines: Array<{ documentReference?: Array<unknown> }> }).invoiceLines;
      const line = lines[0];
      if (!line) {
        throw new Error('base example has no invoice line');
      }
      const altered = {
        ...document,
        invoiceLines: [{ ...line, documentReference: [{ id: 'a', documentTypeCode: '50' }] }, ...lines.slice(1)],
      } as unknown as PeppolDocument;
      const result = yield* validatePeppolEn16931R101(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
