import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { getAllAllowanceCharges, schematronRule } from '#/schematron/helpers';
import { allowanceChargeReasonCodesKeys } from '#/values/allowance-charge-reason-codes.generated';

const rule = {
  id: 'PEPPOL-EN16931-CL002',
  level: 'fatal',
  message: 'Reason code MUST be according to subset of UNCL 5189 D.16B.',
} as const satisfies SchematronRule;

function evaluatePeppolEn16931CL002(document: PeppolDocument): boolean {
  const allowances = getAllAllowanceCharges(document).filter(ac => !ac.chargeIndicator);
  const passed = allowances.every(
    ac => ac.reasonCode === undefined || (allowanceChargeReasonCodesKeys as ReadonlyArray<string>).includes(ac.reasonCode)
  );
  return passed;
}

export const validatePeppolEn16931CL002 = schematronRule(rule, evaluatePeppolEn16931CL002);
