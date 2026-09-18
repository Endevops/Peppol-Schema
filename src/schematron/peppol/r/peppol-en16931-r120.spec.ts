/**
 * @description Unit tests for PEPPOL-EN16931-R120 (line net amount equals quantity * price).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample, decodeFixture, fixtures } from '#/test/test-utils.ts';

import { validatePeppolEn16931R120 } from './peppol-en16931-r120.ts';

describe('PEPPOL-EN16931-R120 (line net amount equals quantity * price)', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolEn16931R120(document);
    })
  );

  it.effect(
    'fails when the line extension amount does not match the computed value',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      const lines = (document as PeppolDocument & { invoiceLines: Array<{ lineExtensionAmount: unknown }> }).invoiceLines;
      const line = lines[0];
      if (!line) {
        throw new Error('base example has no invoice line');
      }
      const altered = {
        ...document,
        invoiceLines: [{ ...line, lineExtensionAmount: { currencyId: 'EUR', value: 99999 } }, ...lines.slice(1)],
      } as unknown as PeppolDocument;
      const result = yield* validatePeppolEn16931R120(altered).pipe(Effect.result);
      assert(Result.isFailure(result));
      if (Result.isFailure(result)) {
        const fields = result.failure.fields ?? [];
        assert(fields.length > 0);
        assert(fields[0]?.path === 'invoiceLines[0].lineExtensionAmount.value');
        assert(fields[0]?.expected === 2800);
        assert(fields[0]?.actual === 99999);
        const operands = fields.slice(1);
        assert(operands.length === 3);
        for (const operand of operands) {
          assert(operand.expected === null);
        }
        assert(operands[0]?.path === 'invoiceLines[0].invoicedQuantity.value');
        assert(operands[0]?.actual === 7);
        assert(operands[1]?.path === 'invoiceLines[0].price.priceAmount.value');
        assert(operands[1]?.actual === 400);
        assert(operands[2]?.path === 'invoiceLines[0].price.baseQuantity.value');
        assert(operands[2]?.actual === null);
      }
    })
  );

  it.effect(
    'reports creditNoteLines paths for a credit note',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => (await decodeFixture(fixtures.creditNote)) as any);
      document.creditNoteLines = [{ ...document.creditNoteLines[0], lineExtensionAmount: { currencyId: 'EUR', value: 99999 } }];
      const result = yield* validatePeppolEn16931R120(document).pipe(Effect.result);
      assert(Result.isFailure(result));
      if (Result.isFailure(result)) {
        const fields = result.failure.fields ?? [];
        assert(fields.length > 0);
        assert(fields[0]?.path === 'creditNoteLines[0].lineExtensionAmount.value');
        assert(fields[0]?.expected === 2800);
        assert(fields[0]?.actual === 99999);
      }
    })
  );

  it.effect(
    'reports a null expected when the computed value is not finite',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => (await decodeBaseExample()) as any);
      const line = document.invoiceLines[0];
      document.invoiceLines = [{ ...line, price: { ...line.price, baseQuantity: { value: 0 } } }, ...document.invoiceLines.slice(1)];
      const result = yield* validatePeppolEn16931R120(document).pipe(Effect.result);
      assert(Result.isFailure(result));
      if (Result.isFailure(result)) {
        const fields = result.failure.fields ?? [];
        assert(fields.length > 0);
        assert(fields[0]?.path === 'invoiceLines[0].lineExtensionAmount.value');
        assert(fields[0]?.expected === null);
        assert(fields[0]?.actual === 2800);
      }
    })
  );
});
