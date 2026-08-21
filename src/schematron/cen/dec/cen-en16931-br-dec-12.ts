import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { hasMaxTwoDecimals, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-DEC-12',
  level: 'fatal',
  message: 'The allowed maximum number of decimals for the Invoice total amount without VAT (BT-109) is 2.',
} as const satisfies SchematronRule;

export function validateCenEn16931BrDec12(document: PeppolDocument): SchematronRuleResult {
  const passed = !document.legalMonetaryTotal.taxExclusiveAmount || hasMaxTwoDecimals(document.legalMonetaryTotal.taxExclusiveAmount.value);
  return schematronResult(rule, passed);
}
