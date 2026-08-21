import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getAllAllowanceCharges, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'PEPPOL-EN16931-R042',
  level: 'fatal',
  message: 'Allowance/charge percentage MUST be provided when allowance/charge base amount is provided.',
} as const satisfies SchematronRule;

export function validatePeppolEn16931R042(document: PeppolDocument): SchematronRuleResult {
  const allowanceCharges = getAllAllowanceCharges(document);
  const passed = allowanceCharges.every(ac => ac.baseAmount === undefined || Boolean(ac.multiplierFactorNumeric));
  return schematronResult(rule, passed);
}
