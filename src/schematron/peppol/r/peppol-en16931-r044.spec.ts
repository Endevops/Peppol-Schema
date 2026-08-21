/**
 * @description Unit tests for PEPPOL-EN16931-R044 (no charge on price level).
 */
/**
 * @effect-diagnostics nodeBuiltinImport:off
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample, decodeFixture, fixtures } from '#/test/test-utils';

import { validatePeppolEn16931R044 } from './peppol-en16931-r044';

describe('PEPPOL-EN16931-R044 (no charge on price level)', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolEn16931R044(document).passed).toEqual(true);
  });

  it('fails when a price-level allowance/charge is a charge', async () => {
    const document = await decodeBaseExample();
    const lines = (document as PeppolDocument & { invoiceLines: Array<{ price: { allowanceCharge?: unknown } }> }).invoiceLines;
    const line = lines[0];
    if (!line) {
      throw new Error('base example has no invoice line');
    }
    const altered = {
      ...document,
      invoiceLines: [
        { ...line, price: { ...line.price, allowanceCharge: { amount: { currencyId: 'EUR', value: 5 }, chargeIndicator: true } } },
        ...lines.slice(1),
      ],
    } as unknown as PeppolDocument;
    expect(validatePeppolEn16931R044(altered).passed).toEqual(false);
  });

  it('R044 and R046 should pass on the allowance example', async () => {
    const document = await decodeFixture(fixtures.allowance);
    expect(validatePeppolEn16931R044(document).passed).toEqual(true);
  });
});
