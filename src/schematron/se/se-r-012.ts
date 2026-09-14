import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getCustomerCountry, getSupplierCountry, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'SE-R-012',
  level: 'warning',
  message: 'For domestic transactions between Swedish trading partners, credit transfer should be indicated by PaymentMeansCode="30"',
} as const satisfies SchematronRule;

function evaluateSeR012(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'SE' || getCustomerCountry(document) !== 'SE') {
    return true;
  }
  const passed = (document.paymentMeans ?? []).every(payment => payment.paymentMeansCode.code !== '31');
  return passed;
}

export const validateSeR012 = schematronRule(rule, evaluateSeR012);
