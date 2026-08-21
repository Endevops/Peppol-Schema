import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { hasMaxTwoDecimals, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-DEC-14',
  level: 'fatal',
  message: 'The allowed maximum number of decimals for the Invoice total amount with VAT (BT-112) is 2.',
} as const satisfies SchematronRule;

export function validateCenEn16931BrDec14(document: PeppolDocument): SchematronRuleResult {
  const passed = !document.legalMonetaryTotal.taxInclusiveAmount || hasMaxTwoDecimals(document.legalMonetaryTotal.taxInclusiveAmount.value);
  return schematronResult(rule, passed);
}
