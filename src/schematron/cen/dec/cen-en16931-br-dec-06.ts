import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { hasMaxTwoDecimals, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-DEC-06',
  level: 'fatal',
  message: 'The allowed maximum number of decimals for the Document level charge base amount (BT-100) is 2.',
} as const satisfies SchematronRule;

export function validateCenEn16931BrDec06(document: PeppolDocument): SchematronRuleResult {
  const passed = (document.allowanceCharges ?? [])
    .filter(ac => ac.chargeIndicator)
    .every(ac => !ac.baseAmount || hasMaxTwoDecimals(ac.baseAmount.value));
  return schematronResult(rule, passed);
}
