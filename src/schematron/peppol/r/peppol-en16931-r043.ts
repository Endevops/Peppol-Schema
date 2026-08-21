import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getAllAllowanceCharges, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'PEPPOL-EN16931-R043',
  level: 'fatal',
  message: "Allowance/charge ChargeIndicator value MUST equal 'true' or 'false'",
} as const satisfies SchematronRule;

export function validatePeppolEn16931R043(document: PeppolDocument): SchematronRuleResult {
  const allowanceCharges = getAllAllowanceCharges(document);
  const passed = allowanceCharges.every(ac => typeof ac.chargeIndicator === 'boolean');
  return schematronResult(rule, passed);
}
