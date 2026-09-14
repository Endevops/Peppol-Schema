import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getAllAllowanceCharges, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'PEPPOL-EN16931-R042',
  level: 'fatal',
  message: 'Allowance/charge percentage MUST be provided when allowance/charge base amount is provided.',
} as const satisfies SchematronRule;

function evaluatePeppolEn16931R042(document: PeppolDocument): boolean {
  const allowanceCharges = getAllAllowanceCharges(document);
  const passed = allowanceCharges.every(ac => ac.baseAmount === undefined || Boolean(ac.multiplierFactorNumeric));
  return passed;
}

export const validatePeppolEn16931R042 = schematronRule(rule, evaluatePeppolEn16931R042);
