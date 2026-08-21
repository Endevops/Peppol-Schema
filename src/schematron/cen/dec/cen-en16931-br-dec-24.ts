import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getLines, hasMaxTwoDecimals, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-DEC-24',
  level: 'fatal',
  message: 'The allowed maximum number of decimals for the Invoice line allowance amount (BT-136) is 2.',
} as const satisfies SchematronRule;

export function validateCenEn16931BrDec24(document: PeppolDocument): SchematronRuleResult {
  const passed = getLines(document).every(line =>
    (line.allowanceCharges ?? []).filter(ac => !ac.chargeIndicator).every(ac => !ac.amount || hasMaxTwoDecimals(ac.amount.value))
  );
  return schematronResult(rule, passed);
}
