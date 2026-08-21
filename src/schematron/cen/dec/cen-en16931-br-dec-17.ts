import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { hasMaxTwoDecimals, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-DEC-17',
  level: 'fatal',
  message: 'The allowed maximum number of decimals for the Rounding amount (BT-114) is 2.',
} as const satisfies SchematronRule;

export function validateCenEn16931BrDec17(document: PeppolDocument): SchematronRuleResult {
  const passed = !document.legalMonetaryTotal.payableRoundingAmount || hasMaxTwoDecimals(document.legalMonetaryTotal.payableRoundingAmount.value);
  return schematronResult(rule, passed);
}
