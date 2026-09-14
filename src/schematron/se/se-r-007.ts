import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getSupplierCountry, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'SE-R-007',
  level: 'warning',
  message: 'For Swedish suppliers using Plusgiro, the Account ID must be numeric ',
} as const satisfies SchematronRule;

function evaluateSeR007(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'SE') {
    return true;
  }
  const passed = (document.paymentMeans ?? []).every(payment => {
    if (payment.paymentMeansCode.code !== '30' || payment.payeeFinancialAccount?.financialInstitutionBranch?.id !== 'SE:PLUSGIRO') {
      return true;
    }
    const accountId = payment.payeeFinancialAccount?.id;
    return accountId !== undefined && /^\d+$/.test(accountId.trim());
  });
  return passed;
}

export const validateSeR007 = schematronRule(rule, evaluateSeR007);
