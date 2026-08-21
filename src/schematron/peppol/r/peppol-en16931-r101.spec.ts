/**
 * @description Unit tests for PEPPOL-EN16931-R101 (document reference only with code 130).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolEn16931R101 } from './peppol-en16931-r101';

describe('PEPPOL-EN16931-R101 (document reference only with code 130)', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolEn16931R101(document).passed).toEqual(true);
  });

  it('fails when a document reference uses a code other than 130', async () => {
    const document = await decodeBaseExample();
    const lines = (document as PeppolDocument & { invoiceLines: Array<{ documentReference?: Array<unknown> }> }).invoiceLines;
    const line = lines[0];
    if (!line) {
      throw new Error('base example has no invoice line');
    }
    const altered = {
      ...document,
      invoiceLines: [{ ...line, documentReference: [{ id: 'a', documentTypeCode: '50' }] }, ...lines.slice(1)],
    } as unknown as PeppolDocument;
    expect(validatePeppolEn16931R101(altered).passed).toEqual(false);
  });
});
