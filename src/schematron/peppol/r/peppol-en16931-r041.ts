import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getAllAllowanceCharges, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'PEPPOL-EN16931-R041',
  level: 'fatal',
  message: 'Allowance/charge base amount MUST be provided when allowance/charge percentage is provided.',
} as const satisfies SchematronRule;

function evaluatePeppolEn16931R041(document: PeppolDocument): boolean {
  const allowanceCharges = getAllAllowanceCharges(document);
  const passed = allowanceCharges.every(ac => !ac.multiplierFactorNumeric || ac.baseAmount !== undefined);
  return passed;
}

export const validatePeppolEn16931R041 = schematronRule(rule, evaluatePeppolEn16931R041);
