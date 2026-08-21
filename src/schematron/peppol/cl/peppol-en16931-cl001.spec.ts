/**
 * @description Unit tests for PEPPOL-EN16931-CL001 (mime code).
 */
/**
 * @effect-diagnostics nodeBuiltinImport:off
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample, decodeFixture } from '#/test/test-utils';

import { validatePeppolEn16931CL001 } from './peppol-en16931-cl001';

const fixtures = {
  allowance: '#/test/files/v3/invoice/Allowance-example.xml',
  creditNote: '#/test/files/v3/credit-note/base-creditnote-correction.xml',
  negative: '#/test/files/v3/invoice/base-negative-inv-correction.xml',
  vatCategoryE: '#/test/files/v3/invoice/vat-category-E.xml',
  vatCategoryO: '#/test/files/v3/invoice/vat-category-O.xml',
} as const;

describe('PEPPOL-EN16931-CL001 (mime code)', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolEn16931CL001(document).passed).toEqual(true);
  });

  it('passes for a supported mime code', async () => {
    const document = await decodeBaseExample();
    const altered = {
      ...document,
      additionalDocumentReferences: [
        {
          id: { id: 'ref' },
          attachment: { embeddedDocumentBinaryObject: { content: 'aGVsbG8=', mimeCode: 'application/pdf', filename: 'doc.pdf' } },
        },
      ],
    } as unknown as PeppolDocument;
    expect(validatePeppolEn16931CL001(altered).passed).toEqual(true);
  });

  it('fails for an unsupported mime code', async () => {
    const document = await decodeBaseExample();
    const altered = {
      ...document,
      additionalDocumentReferences: [
        {
          id: { id: 'ref' },
          attachment: { embeddedDocumentBinaryObject: { content: 'aGVsbG8=', mimeCode: 'application/x-unknown', filename: 'doc.pdf' } },
        },
      ],
    } as unknown as PeppolDocument;
    expect(validatePeppolEn16931CL001(altered).passed).toEqual(false);
  });

  it('CL001 should pass when there are no attachments', async () => {
    const document = await decodeFixture(fixtures.vatCategoryO);
    expect(validatePeppolEn16931CL001(document).passed).toEqual(true);
  });
});
