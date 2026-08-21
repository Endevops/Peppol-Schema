/**
 * @description Unit tests for PEPPOL-EN16931-R120 (line net amount equals quantity * price).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolEn16931R120 } from './peppol-en16931-r120';

describe('PEPPOL-EN16931-R120 (line net amount equals quantity * price)', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolEn16931R120(document).passed).toEqual(true);
  });

  it('fails when the line extension amount does not match the computed value', async () => {
    const document = await decodeBaseExample();
    const lines = (document as PeppolDocument & { invoiceLines: Array<{ lineExtensionAmount: unknown }> }).invoiceLines;
    const line = lines[0];
    if (!line) {
      throw new Error('base example has no invoice line');
    }
    const altered = {
      ...document,
      invoiceLines: [{ ...line, lineExtensionAmount: { currencyId: 'EUR', value: 99999 } }, ...lines.slice(1)],
    } as unknown as PeppolDocument;
    expect(validatePeppolEn16931R120(altered).passed).toEqual(false);
  });
});
