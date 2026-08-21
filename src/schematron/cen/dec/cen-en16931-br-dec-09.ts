import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { hasMaxTwoDecimals, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-DEC-09',
  level: 'fatal',
  message: 'The allowed maximum number of decimals for the Sum of Invoice line net amount (BT-106) is 2.',
} as const satisfies SchematronRule;

export function validateCenEn16931BrDec09(document: PeppolDocument): SchematronRuleResult {
  const passed = !document.legalMonetaryTotal.lineExtensionAmount || hasMaxTwoDecimals(document.legalMonetaryTotal.lineExtensionAmount.value);
  return schematronResult(rule, passed);
}
