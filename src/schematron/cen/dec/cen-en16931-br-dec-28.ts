import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getLines, hasMaxTwoDecimals, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-DEC-28',
  level: 'fatal',
  message: 'The allowed maximum number of decimals for the Invoice line charge base amount (BT-142) is 2.',
} as const satisfies SchematronRule;

export function validateCenEn16931BrDec28(document: PeppolDocument): SchematronRuleResult {
  const passed = getLines(document).every(line =>
    (line.allowanceCharges ?? []).filter(ac => ac.chargeIndicator).every(ac => !ac.baseAmount || hasMaxTwoDecimals(ac.baseAmount.value))
  );
  return schematronResult(rule, passed);
}
