import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { isCustomerGermany, isSupplierGermany, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'DE-R-022',
  level: 'fatal',
  message:
    'Attached documents provided with an invoice in "ADDITIONAL SUPPORTING DOCUMENTS" (BG-24) shall have a unique filename (non case-sensitive) within the element "Attached document" (BT-125).',
} as const satisfies SchematronRule;

export function validateDeR022(document: PeppolDocument): SchematronRuleResult {
  if (!isSupplierGermany(document) || !isCustomerGermany(document)) {
    return schematronResult(rule, true);
  }
  const filenames = (document.additionalDocumentReferences ?? [])
    .map(ref => ref.attachment?.embeddedDocumentBinaryObject?.filename)
    .filter((filename): filename is string => filename !== undefined)
    .map(filename => filename.toLowerCase());
  return schematronResult(rule, new Set(filenames).size === filenames.length);
}
