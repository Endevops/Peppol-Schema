import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getAllAllowanceCharges, schematronResult } from '#/schematron/helpers';
import { allowanceChargeReasonCodesKeys } from '#/values/allowance-charge-reason-codes.generated';

const rule = {
  id: 'PEPPOL-EN16931-CL002',
  level: 'fatal',
  message: 'Reason code MUST be according to subset of UNCL 5189 D.16B.',
} as const satisfies SchematronRule;

export function validatePeppolEn16931CL002(document: PeppolDocument): SchematronRuleResult {
  const allowances = getAllAllowanceCharges(document).filter(ac => !ac.chargeIndicator);
  const passed = allowances.every(
    ac => ac.reasonCode === undefined || (allowanceChargeReasonCodesKeys as ReadonlyArray<string>).includes(ac.reasonCode)
  );
  return schematronResult(rule, passed);
}
