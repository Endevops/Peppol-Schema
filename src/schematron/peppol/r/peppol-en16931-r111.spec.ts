/**
 * @description Unit tests for PEPPOL-EN16931-R111 (line period end within invoice period).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolEn16931R111 } from './peppol-en16931-r111';

describe('PEPPOL-EN16931-R111 (line period end within invoice period)', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolEn16931R111(document).passed).toEqual(true);
  });

  it('fails when a line period ends after the invoice period end', async () => {
    const document = await decodeBaseExample();
    const lines = (document as PeppolDocument & { invoiceLines: Array<{ invoicePeriod?: unknown }> }).invoiceLines;
    const line = lines[0];
    if (!line) {
      throw new Error('base example has no invoice line');
    }
    const altered = {
      ...document,
      invoicePeriod: { endDate: '2017-10-31' },
      invoiceLines: [{ ...line, invoicePeriod: { endDate: '2017-11-01' } }, ...lines.slice(1)],
    } as unknown as PeppolDocument;
    expect(validatePeppolEn16931R111(altered).passed).toEqual(false);
  });
});
