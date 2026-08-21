import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'IS-R-009',
  level: 'fatal',
  message: '[IS-R-009]-If seller is icelandic and invoice contains supporting description EINDAGI invoice must have due date',
} as const satisfies SchematronRule;

export function validateIsR009(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'IS') {
    return schematronResult(rule, true);
  }
  const hasEindagi = (document.additionalDocumentReferences ?? []).some(ref => ref.documentDescription === 'EINDAGI');
  if (!hasEindagi) {
    return schematronResult(rule, true);
  }
  return schematronResult(rule, Boolean(document.dueDate));
}
