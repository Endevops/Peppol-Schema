/**
 * @description Unit tests for PEPPOL-EN16931-P0100 (invoice type code per profile).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolEn16931P0100 } from './peppol-en16931-p0100';

describe('PEPPOL-EN16931-P0100 (invoice type code per profile)', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolEn16931P0100(document).passed).toEqual(true);
  });

  it('fails when profile 01 uses an unsupported invoice type code', async () => {
    const document = await decodeBaseExample();
    const altered = { ...document, invoiceTypeCode: '999' } as unknown as PeppolDocument;
    expect(validatePeppolEn16931P0100(altered).passed).toEqual(false);
  });
});
