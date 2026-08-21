import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { hasMaxTwoDecimals, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-DEC-11',
  level: 'fatal',
  message: 'The allowed maximum number of decimals for the Sum of charges on document level (BT-108) is 2.',
} as const satisfies SchematronRule;

export function validateCenEn16931BrDec11(document: PeppolDocument): SchematronRuleResult {
  const passed = !document.legalMonetaryTotal.chargeTotalAmount || hasMaxTwoDecimals(document.legalMonetaryTotal.chargeTotalAmount.value);
  return schematronResult(rule, passed);
}
