import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { getSupplierCountry, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'SE-R-011',
  level: 'warning',
  message:
    'For Swedish suppliers using Swedish Bankgiro or Plusgiro, the proper way to indicate this is to use Code 30 for PaymentMeans and FinancialInstitutionBranch ID with code SE:BANKGIRO or SE:PLUSGIRO',
} as const satisfies SchematronRule;

function evaluateSeR011(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'SE') {
    return true;
  }
  const passed = (document.paymentMeans ?? []).every(payment => {
    const code = payment.paymentMeansCode.code;
    return code !== '50' && code !== '56';
  });
  return passed;
}

export const validateSeR011 = schematronRule(rule, evaluateSeR011);
