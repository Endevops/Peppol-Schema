import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'IS-R-010',
  level: 'fatal',
  message: '[IS-R-010]-If seller is icelandic and invoice contains supporting description EINDAGI the id date must be same or later than due date',
} as const satisfies SchematronRule;

export function validateIsR010(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'IS') {
    return schematronResult(rule, true);
  }
  const eindagiReferences = (document.additionalDocumentReferences ?? []).filter(ref => ref.documentDescription === 'EINDAGI');
  if (eindagiReferences.length === 0) {
    return schematronResult(rule, true);
  }
  const dueDate = document.dueDate;
  if (!dueDate) {
    return schematronResult(rule, false);
  }
  const passed = eindagiReferences.every(ref => {
    const id = ref.id.id;
    return id >= dueDate;
  });
  return schematronResult(rule, passed);
}
