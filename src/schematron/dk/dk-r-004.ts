import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { getAllAllowanceCharges, isDanishSupplierAndCustomer, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'DK-R-004',
  level: 'fatal',
  message:
    'When specifying non-VAT Taxes for Danish customers, Danish suppliers MUST use the AllowanceChargeReasonCode="ZZZ" and MUST be specified in AllowanceChargeReason; Either as the 4-digit Tax category or must include a #, but the # is not allowed as first and last character',
} as const satisfies SchematronRule;

function evaluateDkR004(document: PeppolDocument): boolean {
  if (!isDanishSupplierAndCustomer(document)) {
    return true;
  }
  const passed = getAllAllowanceCharges(document).every(ac => {
    if (ac.reasonCode !== 'ZZZ') {
      return true;
    }
    const reason = ac.allowanceChargeReason;
    if (reason === undefined) {
      return false;
    }
    const is4DigitTaxCategory = /^\d{4}$/.test(reason) && Number(reason) >= 0 && Number(reason) <= 9999;
    const hasHashInside = reason.includes('#') && !reason.startsWith('#') && !reason.endsWith('#');
    return is4DigitTaxCategory || hasHashInside;
  });
  return passed;
}

export const validateDkR004 = schematronRule(rule, evaluateDkR004);
