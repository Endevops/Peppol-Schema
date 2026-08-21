import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { hasMaxTwoDecimals, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-DEC-02',
  level: 'fatal',
  message: 'The allowed maximum number of decimals for the Document level allowance base amount (BT-93) is 2.',
} as const satisfies SchematronRule;

export function validateCenEn16931BrDec02(document: PeppolDocument): SchematronRuleResult {
  const passed = (document.allowanceCharges ?? [])
    .filter(ac => !ac.chargeIndicator)
    .every(ac => !ac.baseAmount || hasMaxTwoDecimals(ac.baseAmount.value));
  return schematronResult(rule, passed);
}
