/**
 * @description Unit tests for PEPPOL-EN16931-R121 (base quantity positive).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolEn16931R121 } from './peppol-en16931-r121';

describe('PEPPOL-EN16931-R121 (base quantity positive)', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolEn16931R121(document).passed).toEqual(true);
  });

  it('fails when the base quantity is zero', async () => {
    const document = await decodeBaseExample();
    const lines = (document as PeppolDocument & { invoiceLines: Array<{ price: unknown }> }).invoiceLines;
    const line = lines[0];
    if (!line) {
      throw new Error('base example has no invoice line');
    }
    const altered = {
      ...document,
      invoiceLines: [{ ...line, price: { ...line.price, baseQuantity: { value: 0, unitCode: 'C62' } } }, ...lines.slice(1)],
    } as unknown as PeppolDocument;
    expect(validatePeppolEn16931R121(altered).passed).toEqual(false);
  });
});
