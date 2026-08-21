import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getAllAllowanceCharges, getCustomerCountry, getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'DK-R-004',
  level: 'fatal',
  message:
    'When specifying non-VAT Taxes for Danish customers, Danish suppliers MUST use the AllowanceChargeReasonCode="ZZZ" and MUST be specified in AllowanceChargeReason; Either as the 4-digit Tax category or must include a #, but the # is not allowed as first and last character',
} as const satisfies SchematronRule;

export function validateDkR004(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'DK' || getCustomerCountry(document) !== 'DK') {
    return schematronResult(rule, true);
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
  return schematronResult(rule, passed);
}
