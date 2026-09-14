import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { getAllAllowanceCharges, schematronRule, slack } from '#/schematron/helpers';

const rule = {
  id: 'PEPPOL-EN16931-R040',
  level: 'fatal',
  message: 'Allowance/charge amount must equal base amount * percentage/100 if base amount and percentage exists',
} as const satisfies SchematronRule;

function evaluatePeppolEn16931R040(document: PeppolDocument): boolean {
  const allowanceCharges = getAllAllowanceCharges(document);
  const passed = allowanceCharges.every(ac => {
    if (!ac.multiplierFactorNumeric || ac.baseAmount === undefined) {
      return true;
    }
    const expected = (ac.baseAmount * ac.multiplierFactorNumeric) / 100;
    return slack(expected, ac.amount ?? 0, 0.02);
  });
  return passed;
}

export const validatePeppolEn16931R040 = schematronRule(rule, evaluatePeppolEn16931R040);
