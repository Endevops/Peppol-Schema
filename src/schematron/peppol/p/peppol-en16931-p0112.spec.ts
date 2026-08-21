/**
 * @description Unit tests for PEPPOL-EN16931-P0112 (326/384 only German).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolEn16931P0112 } from './peppol-en16931-p0112';

describe('PEPPOL-EN16931-P0112 (326/384 only German)', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolEn16931P0112(document).passed).toEqual(true);
  });

  it('fails when invoice type 384 is used without German parties', async () => {
    const document = await decodeBaseExample();
    const altered = { ...document, invoiceTypeCode: '384' } as unknown as PeppolDocument;
    expect(validatePeppolEn16931P0112(altered).passed).toEqual(false);
  });
});
