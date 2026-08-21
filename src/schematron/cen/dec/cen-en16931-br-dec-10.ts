import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { hasMaxTwoDecimals, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-DEC-10',
  level: 'fatal',
  message: 'The allowed maximum number of decimals for the Sum of allowanced on document level (BT-107) is 2.',
} as const satisfies SchematronRule;

export function validateCenEn16931BrDec10(document: PeppolDocument): SchematronRuleResult {
  const passed = !document.legalMonetaryTotal.allowanceTotalAmount || hasMaxTwoDecimals(document.legalMonetaryTotal.allowanceTotalAmount.value);
  return schematronResult(rule, passed);
}
