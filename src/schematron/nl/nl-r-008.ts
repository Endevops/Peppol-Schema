import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getCustomerCountry, getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'NL-R-008',
  level: 'fatal',
  message:
    '[NL-R-008] For suppliers in the Netherlands, if the customer is in the Netherlands, the payment means code (cac:PaymentMeans/cbc:PaymentMeansCode) MUST be one of 30, 48, 49, 57, 58 or 59',
} as const satisfies SchematronRule;

const ALLOWED_CODES = new Set(['30', '48', '49', '57', '58', '59']);

export function validateNlR008(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'NL' || getCustomerCountry(document) !== 'NL') {
    return schematronResult(rule, true);
  }
  const passed = (document.paymentMeans ?? []).every(payment => ALLOWED_CODES.has(payment.paymentMeansCode.code));
  return schematronResult(rule, passed);
}
