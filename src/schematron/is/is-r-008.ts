import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getSupplierCountry, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'IS-R-008',
  level: 'fatal',
  message: '[IS-R-008]-If seller is icelandic and invoice contains supporting description EINDAGI then the id form must be YYYY-MM-DD',
} as const satisfies SchematronRule;

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

function evaluateIsR008(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'IS') {
    return true;
  }
  const eindagiReferences = (document.additionalDocumentReferences ?? []).filter(ref => ref.documentDescription === 'EINDAGI');
  if (eindagiReferences.length === 0) {
    return true;
  }
  const passed = eindagiReferences.every(ref => {
    const id = ref.id.id;
    return id.length === 10 && DATE_REGEX.test(id) && !Number.isNaN(Date.parse(id));
  });
  return passed;
}

export const validateIsR008 = schematronRule(rule, evaluateIsR008);
