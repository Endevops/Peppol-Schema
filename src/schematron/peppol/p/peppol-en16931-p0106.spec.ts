/**
 * @description Unit tests for PEPPOL-EN16931-P0106 (tax category K for VATEX-EU-IC).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validatePeppolEn16931P0106 } from './peppol-en16931-p0106.ts';

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

describe('PEPPOL-EN16931-P0106 (tax category K for VATEX-EU-IC)', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolEn16931P0106(document);
    })
  );

  it.effect(
    'fails when VATEX-EU-IC is paired with a non-K category',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => withExemptionReason('VATEX-EU-IC', 'S'));
      const result = yield* validatePeppolEn16931P0106(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'passes when no VATEX-EU-IC exemption reason is used',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolEn16931P0106(document);
    })
  );

  it.effect(
    'passes when VATEX-EU-IC is paired with category K',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => withExemptionReason('VATEX-EU-IC', 'K'));
      yield* validatePeppolEn16931P0106(document);
    })
  );
});
