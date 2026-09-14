/**
 * @description Unit tests for PEPPOL-EN16931-P0109 (tax category E for VATEX-EU-F).
 */
import { assert, describe, it } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { decodeBaseExample } from '#/test/test-utils.ts';

import { validatePeppolEn16931P0109 } from './peppol-en16931-p0109.ts';

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

describe('PEPPOL-EN16931-P0109 (tax category E for VATEX-EU-F)', () => {
  it.effect(
    'passes on the base example',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolEn16931P0109(document);
    })
  );

  it.effect(
    'fails when VATEX-EU-F is paired with a non-E category',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => withExemptionReason('VATEX-EU-F', 'S'));
      const result = yield* validatePeppolEn16931P0109(document).pipe(Effect.result);
      assert(Result.isFailure(result));
    })
  );

  it.effect(
    'passes when no VATEX-EU-F exemption reason is used',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => decodeBaseExample());
      yield* validatePeppolEn16931P0109(document);
    })
  );

  it.effect(
    'passes when VATEX-EU-F is paired with category E',
    Effect.fn(function* () {
      const document = yield* Effect.promise(async () => withExemptionReason('VATEX-EU-F', 'E'));
      yield* validatePeppolEn16931P0109(document);
    })
  );
});
