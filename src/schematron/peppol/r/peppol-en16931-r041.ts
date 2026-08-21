import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getAllAllowanceCharges, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'PEPPOL-EN16931-R041',
  level: 'fatal',
  message: 'Allowance/charge base amount MUST be provided when allowance/charge percentage is provided.',
} as const satisfies SchematronRule;

export function validatePeppolEn16931R041(document: PeppolDocument): SchematronRuleResult {
  const allowanceCharges = getAllAllowanceCharges(document);
  const passed = allowanceCharges.every(ac => !ac.multiplierFactorNumeric || ac.baseAmount !== undefined);
  return schematronResult(rule, passed);
}
