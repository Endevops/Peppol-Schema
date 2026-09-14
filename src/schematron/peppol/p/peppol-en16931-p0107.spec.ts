/**
 * @description Unit tests for PEPPOL-EN16931-P0107 (tax category AE for VATEX-EU-AE).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolEn16931P0107 } from './peppol-en16931-p0107';

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

describe('PEPPOL-EN16931-P0107 (tax category AE for VATEX-EU-AE)', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolEn16931P0107(document);
    })
  );

  it.effect(
    'fails when VATEX-EU-AE is paired with a non-AE category',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => withExemptionReason('VATEX-EU-AE', 'S'));
      const result = yield* validatePeppolEn16931P0107(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'passes when no VATEX-EU-AE exemption reason is used',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolEn16931P0107(document);
    })
  );

  it.effect(
    'passes when VATEX-EU-AE is paired with category AE',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => withExemptionReason('VATEX-EU-AE', 'AE'));
      yield* validatePeppolEn16931P0107(document);
    })
  );
});
