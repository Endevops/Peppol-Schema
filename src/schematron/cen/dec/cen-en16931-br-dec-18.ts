import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { hasMaxTwoDecimals, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-DEC-18',
  level: 'fatal',
  message: 'The allowed maximum number of decimals for the Amount due for payment (BT-115) is 2.',
} as const satisfies SchematronRule;

export function validateCenEn16931BrDec18(document: PeppolDocument): SchematronRuleResult {
  const passed = !document.legalMonetaryTotal.payableAmount || hasMaxTwoDecimals(document.legalMonetaryTotal.payableAmount.value);
  return schematronResult(rule, passed);
}
