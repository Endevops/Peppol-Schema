/**
 * @description Unit tests for PEPPOL-EN16931-P0105 (tax category O for VATEX-EU-O).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolEn16931P0105 } from './peppol-en16931-p0105';

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

describe('PEPPOL-EN16931-P0105 (tax category O for VATEX-EU-O)', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolEn16931P0105(document).passed).toEqual(true);
  });

  it('fails when VATEX-EU-O is paired with a non-O category', async () => {
    const document = await withExemptionReason('VATEX-EU-O', 'S');
    expect(validatePeppolEn16931P0105(document).passed).toEqual(false);
  });

  it('passes when no VATEX-EU-O exemption reason is used', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolEn16931P0105(document).passed).toEqual(true);
  });

  it('passes when VATEX-EU-O is paired with category O', async () => {
    const document = await withExemptionReason('VATEX-EU-O', 'O');
    expect(validatePeppolEn16931P0105(document).passed).toEqual(true);
  });
});
