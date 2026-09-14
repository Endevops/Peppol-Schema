/**
 * @description Unit tests for PEPPOL-EN16931-R110 (line period start within invoice period).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolEn16931R110 } from './peppol-en16931-r110';

describe('PEPPOL-EN16931-R110 (line period start within invoice period)', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolEn16931R110(document);
    })
  );

  it.effect(
    'fails when a line period starts before the invoice period start',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      const lines = (document as PeppolDocument & { invoiceLines: Array<{ invoicePeriod?: unknown }> }).invoiceLines;
      const line = lines[0];
      if (!line) {
        throw new Error('base example has no invoice line');
      }
      const altered = {
        ...document,
        invoicePeriod: { startDate: '2017-10-01' },
        invoiceLines: [{ ...line, invoicePeriod: { startDate: '2017-09-01' } }, ...lines.slice(1)],
      } as unknown as PeppolDocument;
      const result = yield* validatePeppolEn16931R110(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
