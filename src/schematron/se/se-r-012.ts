import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getCustomerCountry, getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'SE-R-012',
  level: 'warning',
  message: 'For domestic transactions between Swedish trading partners, credit transfer should be indicated by PaymentMeansCode="30"',
} as const satisfies SchematronRule;

export function validateSeR012(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'SE' || getCustomerCountry(document) !== 'SE') {
    return schematronResult(rule, true);
  }
  const passed = (document.paymentMeans ?? []).every(payment => payment.paymentMeansCode.code !== '31');
  return schematronResult(rule, passed);
}
