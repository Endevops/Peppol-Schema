/**
 * @description Test helper that decodes a real XML fixture into a `PeppolDocument` so tests can build on a structurally valid document.
 *
 * @effect-diagnostics nodeBuiltinImport:off
 */

import { Schema } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';

import { peppolDocumentSchema } from '#/schemas/peppol-document-schema';

const BASE_EXAMPLE = '#/test/files/v3/invoice/base-example.xml';

export function decodeBaseExample(): Promise<PeppolDocument> {
  return decodeFixture(BASE_EXAMPLE);
}

export const fixtures = {
  allowance: '#/test/files/v3/invoice/Allowance-example.xml',
  creditNote: '#/test/files/v3/credit-note/base-creditnote-correction.xml',
  negative: '#/test/files/v3/invoice/base-negative-inv-correction.xml',
  vatCategoryE: '#/test/files/v3/invoice/vat-category-E.xml',
  vatCategoryO: '#/test/files/v3/invoice/vat-category-O.xml',
} as const;
const decodeDocument = Schema.decodeUnknownSync(peppolDocumentSchema);

export async function decodeFixture(filename: string): Promise<PeppolDocument> {
  const content = await import(`${filename}?raw`).then(i => i.default);
  return decodeDocument(content, { reportInput: true }) as unknown as PeppolDocument;
}
