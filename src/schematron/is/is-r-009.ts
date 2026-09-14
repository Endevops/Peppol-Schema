import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { getSupplierCountry, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'IS-R-009',
  level: 'fatal',
  message: '[IS-R-009]-If seller is icelandic and invoice contains supporting description EINDAGI invoice must have due date',
} as const satisfies SchematronRule;

function evaluateIsR009(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'IS') {
    return true;
  }
  const hasEindagi = (document.additionalDocumentReferences ?? []).some(ref => ref.documentDescription === 'EINDAGI');
  if (!hasEindagi) {
    return true;
  }
  return Boolean(document.dueDate);
}

export const validateIsR009 = schematronRule(rule, evaluateIsR009);
