import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { hasMaxTwoDecimals, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-DEC-20',
  level: 'fatal',
  message: 'The allowed maximum number of decimals for the VAT category tax amount (BT-117) is 2.',
} as const satisfies SchematronRule;

export function validateCenEn16931BrDec20(document: PeppolDocument): SchematronRuleResult {
  const passed = document.taxTotals.every(total => (total.taxSubtotals ?? []).every(st => hasMaxTwoDecimals(st.taxAmount.value)));
  return schematronResult(rule, passed);
}
