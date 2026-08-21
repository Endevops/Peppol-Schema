/**
 * @description Unit tests for PEPPOL-EN16931-R046 (item net price = gross price - allowance amount).
 */
/**
 * @effect-diagnostics nodeBuiltinImport:off
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample, decodeFixture, fixtures } from '#/test/test-utils';

import { validatePeppolEn16931R046 } from './peppol-en16931-r046';

describe('PEPPOL-EN16931-R046 (item net price = gross price - allowance amount)', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolEn16931R046(document).passed).toEqual(true);
  });

  it('fails when the price amount differs from base amount minus allowance amount', async () => {
    const document = await decodeBaseExample();
    const lines = (document as PeppolDocument & { invoiceLines: Array<{ price: unknown }> }).invoiceLines;
    const line = lines[0];
    if (!line) {
      throw new Error('base example has no invoice line');
    }
    const altered = {
      ...document,
      invoiceLines: [
        {
          ...line,
          price: {
            ...line.price,
            priceAmount: { currencyId: 'EUR', value: 100 },
            allowanceCharge: { amount: { currencyId: 'EUR', value: 10 }, baseAmount: { currencyId: 'EUR', value: 50 }, chargeIndicator: false },
          },
        },
        ...lines.slice(1),
      ],
    } as unknown as PeppolDocument;
    expect(validatePeppolEn16931R046(altered).passed).toEqual(false);
  });

  it('R044 and R046 should pass on the allowance example', async () => {
    const document = await decodeFixture(fixtures.allowance);
    expect(validatePeppolEn16931R046(document).passed).toEqual(true);
  });
});
