/**
 * @description Unit tests for PEPPOL-EN16931-R003 (buyer reference or purchase order reference).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolEn16931R003 } from './peppol-en16931-r003';

describe('PEPPOL-EN16931-R003 (buyer reference or purchase order reference)', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolEn16931R003(document).passed).toEqual(true);
  });

  it('fails when neither buyerReference nor orderReference is provided', async () => {
    const document = await decodeBaseExample();
    const altered = { ...document, buyerReference: undefined, orderReference: undefined } as unknown as PeppolDocument;
    expect(validatePeppolEn16931R003(altered).passed).toEqual(false);
  });
});
