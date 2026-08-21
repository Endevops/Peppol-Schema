import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getAllAllowanceCharges, schematronResult } from '#/schematron/helpers';
import { chargeReasonCodesKeys } from '#/values/charge-reason-codes.generated';

const rule = {
  id: 'PEPPOL-EN16931-CL003',
  level: 'fatal',
  message: 'Reason code MUST be according to UNCL 7161 D.16B.',
} as const satisfies SchematronRule;

export function validatePeppolEn16931CL003(document: PeppolDocument): SchematronRuleResult {
  const charges = getAllAllowanceCharges(document).filter(ac => ac.chargeIndicator);
  const passed = charges.every(ac => ac.reasonCode === undefined || (chargeReasonCodesKeys as ReadonlyArray<string>).includes(ac.reasonCode));
  return schematronResult(rule, passed);
}
