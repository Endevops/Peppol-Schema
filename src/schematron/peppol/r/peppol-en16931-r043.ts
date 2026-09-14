import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { getAllAllowanceCharges, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'PEPPOL-EN16931-R043',
  level: 'fatal',
  message: "Allowance/charge ChargeIndicator value MUST equal 'true' or 'false'",
} as const satisfies SchematronRule;

function evaluatePeppolEn16931R043(document: PeppolDocument): boolean {
  const allowanceCharges = getAllAllowanceCharges(document);
  const passed = allowanceCharges.every(ac => typeof ac.chargeIndicator === 'boolean');
  return passed;
}

export const validatePeppolEn16931R043 = schematronRule(rule, evaluatePeppolEn16931R043);
