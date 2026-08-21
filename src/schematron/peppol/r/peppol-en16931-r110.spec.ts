/**
 * @description Unit tests for PEPPOL-EN16931-R110 (line period start within invoice period).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolEn16931R110 } from './peppol-en16931-r110';

describe('PEPPOL-EN16931-R110 (line period start within invoice period)', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolEn16931R110(document).passed).toEqual(true);
  });

  it('fails when a line period starts before the invoice period start', async () => {
    const document = await decodeBaseExample();
    const lines = (document as PeppolDocument & { invoiceLines: Array<{ invoicePeriod?: unknown }> }).invoiceLines;
    const line = lines[0];
    if (!line) {
      throw new Error('base example has no invoice line');
    }
    const altered = {
      ...document,
      invoicePeriod: { startDate: '2017-10-01' },
      invoiceLines: [{ ...line, invoicePeriod: { startDate: '2017-09-01' } }, ...lines.slice(1)],
    } as unknown as PeppolDocument;
    expect(validatePeppolEn16931R110(altered).passed).toEqual(false);
  });
});
