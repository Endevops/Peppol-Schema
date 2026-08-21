import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'SE-R-010',
  level: 'warning',
  message: 'For Swedish suppliers using Plusgiro, the Account ID must have 2-8 characters',
} as const satisfies SchematronRule;

export function validateSeR010(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'SE') {
    return schematronResult(rule, true);
  }
  const passed = (document.paymentMeans ?? []).every(payment => {
    if (payment.paymentMeansCode.code !== '30' || payment.payeeFinancialAccount?.financialInstitutionBranch?.id !== 'SE:PLUSGIRO') {
      return true;
    }
    const accountId = payment.payeeFinancialAccount?.id;
    return accountId !== undefined && accountId.trim().length >= 2 && accountId.trim().length <= 8;
  });
  return schematronResult(rule, passed);
}
