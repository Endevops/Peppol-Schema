/**
 * @description Unit tests for PEPPOL-EN16931-R130 (unit code of base quantity matches quantity).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolEn16931R130 } from './peppol-en16931-r130';

describe('PEPPOL-EN16931-R130 (unit code of base quantity matches quantity)', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolEn16931R130(document).passed).toEqual(true);
  });

  it('fails when the base quantity unit code differs from the invoiced quantity unit code', async () => {
    const document = await decodeBaseExample();
    const lines = (document as PeppolDocument & { invoiceLines: Array<{ price: unknown }> }).invoiceLines;
    const line = lines[0];
    if (!line) {
      throw new Error('base example has no invoice line');
    }
    const altered = {
      ...document,
      invoiceLines: [{ ...line, price: { ...line.price, baseQuantity: { value: 1, unitCode: 'C62' } } }, ...lines.slice(1)],
    } as unknown as PeppolDocument;
    expect(validatePeppolEn16931R130(altered).passed).toEqual(false);
  });
});
