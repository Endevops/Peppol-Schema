/**
 * @description Unit tests for PEPPOL-EN16931-P0104 (tax category per exemption reason).
 */
/**
 * @effect-diagnostics nodeBuiltinImport:off
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';

import { decodeBaseExample, decodeFixture, fixtures } from '#/test/test-utils';

import { validatePeppolEn16931P0104 } from './peppol-en16931-p0104';

async function withExemptionReason(code: string, id: string): Promise<PeppolDocument> {
  const document = await decodeBaseExample();
  const subtotal = document.taxTotals[0]?.taxSubtotals?.[0];
  if (!subtotal) {
    throw new Error('base example has no tax subtotal');
  }
  return {
    ...document,
    taxTotals: [
      {
        taxAmount: document.taxTotals[0]?.taxAmount,
        taxSubtotals: [{ ...subtotal, taxCategory: { ...subtotal.taxCategory, taxExemptionReasonCode: code, id } }],
      },
    ],
  } as unknown as PeppolDocument;
}

describe('PEPPOL-EN16931-P0104 (tax category per exemption reason)', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolEn16931P0104(document);
    })
  );

  it.effect(
    'fails when VATEX-EU-G is paired with a non-G category',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => withExemptionReason('VATEX-EU-G', 'S'));
      const result = yield* validatePeppolEn16931P0104(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'P0104 should pass when no VATEX-EU-G exemption reason is used',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeFixture(fixtures.vatCategoryE));
      yield* validatePeppolEn16931P0104(document);
    })
  );
});
