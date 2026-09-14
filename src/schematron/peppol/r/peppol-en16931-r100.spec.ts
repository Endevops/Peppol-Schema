/**
 * @description Unit tests for PEPPOL-EN16931-R100 (only one invoiced object per line).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolEn16931R100 } from './peppol-en16931-r100';

describe('PEPPOL-EN16931-R100 (only one invoiced object per line)', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolEn16931R100(document);
    })
  );

  it.effect(
    'fails when a line has more than one document reference',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      const lines = (document as PeppolDocument & { invoiceLines: Array<{ documentReference?: Array<unknown> }> }).invoiceLines;
      const line = lines[0];
      if (!line) {
        throw new Error('base example has no invoice line');
      }
      const altered = {
        ...document,
        invoiceLines: [
          {
            ...line,
            documentReference: [
              { id: 'a', documentTypeCode: '130' },
              { id: 'b', documentTypeCode: '130' },
            ],
          },
          ...lines.slice(1),
        ],
      } as unknown as PeppolDocument;
      const result = yield* validatePeppolEn16931R100(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
