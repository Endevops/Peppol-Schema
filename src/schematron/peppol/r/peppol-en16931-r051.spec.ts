/**
 * @description Unit tests for PEPPOL-EN16931-R051 (all currency IDs equal document currency).
 */
/**
 * @effect-diagnostics nodeBuiltinImport:off
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample, decodeFixture, fixtures } from '#/test/test-utils.ts';

import { validatePeppolEn16931R051 } from './peppol-en16931-r051.ts';

describe('PEPPOL-EN16931-R051 (all currency IDs equal document currency)', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolEn16931R051(document);
    })
  );

  it.effect(
    'fails when the payable amount uses a different currency',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      const altered = {
        ...document,
        legalMonetaryTotal: { ...document.legalMonetaryTotal, payableAmount: { currencyId: 'USD', value: 100 } },
      } as unknown as PeppolDocument;
      const result = yield* validatePeppolEn16931R051(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'fails when a line extension amount uses a different currency',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      const lines = (document as PeppolDocument & { invoiceLines: Array<{ lineExtensionAmount: unknown }> }).invoiceLines;
      const line = lines[0];
      if (!line) {
        throw new Error('base example has no invoice line');
      }
      const altered = {
        ...document,
        invoiceLines: [{ ...line, lineExtensionAmount: { currencyId: 'USD', value: 100 } }, ...lines.slice(1)],
      } as unknown as PeppolDocument;
      const result = yield* validatePeppolEn16931R051(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'R051 should pass on the allowance example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeFixture(fixtures.allowance));
      yield* validatePeppolEn16931R051(document);
    })
  );

  it.effect(
    'R051 should fail when a currency differs from the document currency',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeFixture(fixtures.allowance));
      const altered = {
        ...document,
        legalMonetaryTotal: { ...document.legalMonetaryTotal, payableAmount: { ...document.legalMonetaryTotal.payableAmount, currencyId: 'USD' } },
      };
      const result = yield* validatePeppolEn16931R051(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );
});
