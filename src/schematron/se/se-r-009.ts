import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'SE-R-009',
  level: 'warning',
  message: 'For Swedish suppliers using Bankgiro, the Account ID must have 7-8 characters',
} as const satisfies SchematronRule;

export function validateSeR009(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'SE') {
    return schematronResult(rule, true);
  }
  const passed = (document.paymentMeans ?? []).every(payment => {
    if (payment.paymentMeansCode.code !== '30' || payment.payeeFinancialAccount?.financialInstitutionBranch?.id !== 'SE:BANKGIRO') {
      return true;
    }
    const accountId = payment.payeeFinancialAccount?.id;
    return accountId !== undefined && (accountId.trim().length === 7 || accountId.trim().length === 8);
  });
  return schematronResult(rule, passed);
}
