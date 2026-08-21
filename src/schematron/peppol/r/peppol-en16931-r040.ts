import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getAllAllowanceCharges, schematronResult, slack } from '#/schematron/helpers';

const rule = {
  id: 'PEPPOL-EN16931-R040',
  level: 'fatal',
  message: 'Allowance/charge amount must equal base amount * percentage/100 if base amount and percentage exists',
} as const satisfies SchematronRule;

export function validatePeppolEn16931R040(document: PeppolDocument): SchematronRuleResult {
  const allowanceCharges = getAllAllowanceCharges(document);
  const passed = allowanceCharges.every(ac => {
    if (!ac.multiplierFactorNumeric || ac.baseAmount === undefined) {
      return true;
    }
    const expected = (ac.baseAmount * ac.multiplierFactorNumeric) / 100;
    return slack(expected, ac.amount ?? 0, 0.02);
  });
  return schematronResult(rule, passed);
}
