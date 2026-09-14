/**
 * @description Unit tests for PEPPOL-EN16931-R111 (line period end within invoice period).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolEn16931R111 } from './peppol-en16931-r111';

describe('PEPPOL-EN16931-R111 (line period end within invoice period)', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolEn16931R111(document);
    })
  );

  it.effect(
    'fails when a line period ends after the invoice period end',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      const lines = (document as PeppolDocument & { invoiceLines: Array<{ invoicePeriod?: unknown }> }).invoiceLines;
      const line = lines[0];
      if (!line) {
        throw new Error('base example has no invoice line');
      }
      const altered = {
        ...document,
        invoicePeriod: { endDate: '2017-10-31' },
        invoiceLines: [{ ...line, invoicePeriod: { endDate: '2017-11-01' } }, ...lines.slice(1)],
      } as unknown as PeppolDocument;
      const result = yield* validatePeppolEn16931R111(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
