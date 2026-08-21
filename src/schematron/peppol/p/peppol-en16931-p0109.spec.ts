/**
 * @description Unit tests for PEPPOL-EN16931-P0109 (tax category E for VATEX-EU-F).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolEn16931P0109 } from './peppol-en16931-p0109';

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
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolEn16931P0109(document).passed).toEqual(true);
  });

  it('fails when VATEX-EU-F is paired with a non-E category', async () => {
    const document = await withExemptionReason('VATEX-EU-F', 'S');
    expect(validatePeppolEn16931P0109(document).passed).toEqual(false);
  });

  it('passes when no VATEX-EU-F exemption reason is used', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolEn16931P0109(document).passed).toEqual(true);
  });

  it('passes when VATEX-EU-F is paired with category E', async () => {
    const document = await withExemptionReason('VATEX-EU-F', 'E');
    expect(validatePeppolEn16931P0109(document).passed).toEqual(true);
  });
});
