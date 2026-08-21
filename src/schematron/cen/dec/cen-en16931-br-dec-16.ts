import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { hasMaxTwoDecimals, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-DEC-16',
  level: 'fatal',
  message: 'The allowed maximum number of decimals for the Paid amount (BT-113) is 2.',
} as const satisfies SchematronRule;

export function validateCenEn16931BrDec16(document: PeppolDocument): SchematronRuleResult {
  const passed = !document.legalMonetaryTotal.prepaidAmount || hasMaxTwoDecimals(document.legalMonetaryTotal.prepaidAmount.value);
  return schematronResult(rule, passed);
}
