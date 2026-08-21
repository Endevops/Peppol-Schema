import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'SE-R-007',
  level: 'warning',
  message: 'For Swedish suppliers using Plusgiro, the Account ID must be numeric ',
} as const satisfies SchematronRule;

export function validateSeR007(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'SE') {
    return schematronResult(rule, true);
  }
  const passed = (document.paymentMeans ?? []).every(payment => {
    if (payment.paymentMeansCode.code !== '30' || payment.payeeFinancialAccount?.financialInstitutionBranch?.id !== 'SE:PLUSGIRO') {
      return true;
    }
    const accountId = payment.payeeFinancialAccount?.id;
    return accountId !== undefined && /^\d+$/.test(accountId.trim());
  });
  return schematronResult(rule, passed);
}
