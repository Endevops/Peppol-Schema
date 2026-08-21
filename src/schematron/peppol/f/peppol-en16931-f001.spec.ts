/**
 * @description Unit tests for PEPPOL-EN16931-F001 (date format).
 */
/**
 * @effect-diagnostics nodeBuiltinImport:off
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample, decodeFixture, fixtures } from '#/test/test-utils';

import { validatePeppolEn16931F001 } from './peppol-en16931-f001';

describe('PEPPOL-EN16931-F001 (date format)', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolEn16931F001(document).passed).toEqual(true);
  });

  it('fails for a malformed date', async () => {
    const document = await decodeBaseExample();
    const altered = { ...document, issueDate: '13-11-2017' } as unknown as PeppolDocument;
    expect(validatePeppolEn16931F001(altered).passed).toEqual(false);
  });

  it('F001 should pass on date fixtures', async () => {
    const document = await decodeFixture(fixtures.vatCategoryE);
    expect(validatePeppolEn16931F001(document).passed).toEqual(true);
  });
});
