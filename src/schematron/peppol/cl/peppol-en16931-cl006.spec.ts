/**
 * @description Unit tests for PEPPOL-EN16931-CL006 (invoice period description code).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolEn16931CL006 } from './peppol-en16931-cl006';

describe('PEPPOL-EN16931-CL006 (invoice period description code)', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolEn16931CL006(document).passed).toEqual(true);
  });

  it('fails for an unsupported description code', async () => {
    const document = await decodeBaseExample();
    const altered = { ...document, invoicePeriod: { descriptionCode: '999' } } as unknown as PeppolDocument;
    expect(validatePeppolEn16931CL006(altered).passed).toEqual(false);
  });
});
