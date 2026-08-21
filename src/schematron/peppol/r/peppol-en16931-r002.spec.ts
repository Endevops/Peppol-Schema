/**
 * @description Unit tests for PEPPOL-EN16931-R002 (no more than one note).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolEn16931R002 } from './peppol-en16931-r002';

describe('PEPPOL-EN16931-R002 (no more than one note)', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolEn16931R002(document).passed).toEqual(true);
  });

  it('passes when there is no note', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolEn16931R002(document).passed).toEqual(true);
  });

  it('passes when there is a single note', async () => {
    const document = { ...(await decodeBaseExample()), note: 'a note' } as unknown as PeppolDocument;
    expect(validatePeppolEn16931R002(document).passed).toEqual(true);
  });
});
