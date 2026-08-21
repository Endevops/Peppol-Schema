/**
 * @description Unit tests for PEPPOL-EN16931-R001.
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolEn16931R001 } from './peppol-en16931-r001';

describe('PEPPOL-EN16931-R001', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolEn16931R001(document).passed).toEqual(true);
  });

  it('passes when the business process is provided', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolEn16931R001(document)).toEqual({
      id: 'PEPPOL-EN16931-R001',
      level: 'fatal',
      message: 'Business process MUST be provided.',
      passed: true,
    });
  });

  it('fails when the business process is empty', async () => {
    const document = { ...(await decodeBaseExample()), profileId: '' };
    expect(validatePeppolEn16931R001(document)).toEqual({
      id: 'PEPPOL-EN16931-R001',
      level: 'fatal',
      message: 'Business process MUST be provided.',
      passed: false,
    });
  });

  it('fails when the business process is missing', async () => {
    const document = { ...(await decodeBaseExample()), profileId: undefined } as unknown as PeppolDocument;
    expect(validatePeppolEn16931R001(document).passed).toEqual(false);
  });
});
