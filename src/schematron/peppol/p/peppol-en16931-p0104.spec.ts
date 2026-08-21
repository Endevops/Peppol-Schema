/**
 * @description Unit tests for PEPPOL-EN16931-P0104 (tax category per exemption reason).
 */
/**
 * @effect-diagnostics nodeBuiltinImport:off
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

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
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolEn16931P0104(document).passed).toEqual(true);
  });

  it('fails when VATEX-EU-G is paired with a non-G category', async () => {
    const document = await withExemptionReason('VATEX-EU-G', 'S');
    expect(validatePeppolEn16931P0104(document).passed).toEqual(false);
  });

  it('P0104 should pass when no VATEX-EU-G exemption reason is used', async () => {
    const document = await decodeFixture(fixtures.vatCategoryE);
    expect(validatePeppolEn16931P0104(document).passed).toEqual(true);
  });
});
