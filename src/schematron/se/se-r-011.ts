import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'SE-R-011',
  level: 'warning',
  message:
    'For Swedish suppliers using Swedish Bankgiro or Plusgiro, the proper way to indicate this is to use Code 30 for PaymentMeans and FinancialInstitutionBranch ID with code SE:BANKGIRO or SE:PLUSGIRO',
} as const satisfies SchematronRule;

export function validateSeR011(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'SE') {
    return schematronResult(rule, true);
  }
  const passed = (document.paymentMeans ?? []).every(payment => {
    const code = payment.paymentMeansCode.code;
    return code !== '50' && code !== '56';
  });
  return schematronResult(rule, passed);
}
