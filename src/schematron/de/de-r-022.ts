import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { isGermanSupplierAndCustomer, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'DE-R-022',
  level: 'fatal',
  message:
    'Attached documents provided with an invoice in "ADDITIONAL SUPPORTING DOCUMENTS" (BG-24) shall have a unique filename (non case-sensitive) within the element "Attached document" (BT-125).',
} as const satisfies SchematronRule;

function evaluateDeR022(document: PeppolDocument): boolean {
  if (!isGermanSupplierAndCustomer(document)) {
    return true;
  }
  const filenames = (document.additionalDocumentReferences ?? [])
    .map(ref => ref.attachment?.embeddedDocumentBinaryObject?.filename)
    .filter((filename): filename is string => filename !== undefined)
    .map(filename => filename.toLowerCase());
  return new Set(filenames).size === filenames.length;
}

export const validateDeR022 = schematronRule(rule, evaluateDeR022);
