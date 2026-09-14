import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getSupplierCountry, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'IS-R-010',
  level: 'fatal',
  message: '[IS-R-010]-If seller is icelandic and invoice contains supporting description EINDAGI the id date must be same or later than due date',
} as const satisfies SchematronRule;

function evaluateIsR010(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'IS') {
    return true;
  }
  const eindagiReferences = (document.additionalDocumentReferences ?? []).filter(ref => ref.documentDescription === 'EINDAGI');
  if (eindagiReferences.length === 0) {
    return true;
  }
  const dueDate = document.dueDate;
  if (!dueDate) {
    return false;
  }
  const passed = eindagiReferences.every(ref => {
    const id = ref.id.id;
    return id >= dueDate;
  });
  return passed;
}

export const validateIsR010 = schematronRule(rule, evaluateIsR010);
