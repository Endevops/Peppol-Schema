import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getAllAllowanceCharges, schematronRule } from '#/schematron/helpers.ts';
import { chargeReasonCodesKeys } from '#/values/charge-reason-codes.generated';

const rule = {
  id: 'PEPPOL-EN16931-CL003',
  level: 'fatal',
  message: 'Reason code MUST be according to UNCL 7161 D.16B.',
} as const satisfies SchematronRule;

function evaluatePeppolEn16931CL003(document: PeppolDocument): boolean {
  const charges = getAllAllowanceCharges(document).filter(ac => ac.chargeIndicator);
  const passed = charges.every(ac => ac.reasonCode === undefined || (chargeReasonCodesKeys as ReadonlyArray<string>).includes(ac.reasonCode));
  return passed;
}

export const validatePeppolEn16931CL003 = schematronRule(rule, evaluatePeppolEn16931CL003);
