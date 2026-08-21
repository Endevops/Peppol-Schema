import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getCustomerCountry, getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'DK-R-005',
  level: 'fatal',
  message: 'For Danish suppliers the following Payment means codes are allowed: 1, 10, 31, 42, 48, 49, 50, 58, 59, 93 and 97',
} as const satisfies SchematronRule;

const ALLOWED_CODES = new Set(['1', '10', '31', '42', '48', '49', '50', '58', '59', '93', '97']);

export function validateDkR005(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'DK' || getCustomerCountry(document) !== 'DK') {
    return schematronResult(rule, true);
  }
  const passed = (document.paymentMeans ?? []).every(payment => ALLOWED_CODES.has(payment.paymentMeansCode.code));
  return schematronResult(rule, passed);
}
