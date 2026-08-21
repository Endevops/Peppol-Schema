/**
 * @description Unit tests for PEPPOL-EN16931-R100 (only one invoiced object per line).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolEn16931R100 } from './peppol-en16931-r100';

describe('PEPPOL-EN16931-R100 (only one invoiced object per line)', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolEn16931R100(document).passed).toEqual(true);
  });

  it('fails when a line has more than one document reference', async () => {
    const document = await decodeBaseExample();
    const lines = (document as PeppolDocument & { invoiceLines: Array<{ documentReference?: Array<unknown> }> }).invoiceLines;
    const line = lines[0];
    if (!line) {
      throw new Error('base example has no invoice line');
    }
    const altered = {
      ...document,
      invoiceLines: [
        {
          ...line,
          documentReference: [
            { id: 'a', documentTypeCode: '130' },
            { id: 'b', documentTypeCode: '130' },
          ],
        },
        ...lines.slice(1),
      ],
    } as unknown as PeppolDocument;
    expect(validatePeppolEn16931R100(altered).passed).toEqual(false);
  });
});
