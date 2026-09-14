import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getSupplierCountry, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'SE-R-010',
  level: 'warning',
  message: 'For Swedish suppliers using Plusgiro, the Account ID must have 2-8 characters',
} as const satisfies SchematronRule;

function evaluateSeR010(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'SE') {
    return true;
  }
  const passed = (document.paymentMeans ?? []).every(payment => {
    if (payment.paymentMeansCode.code !== '30' || payment.payeeFinancialAccount?.financialInstitutionBranch?.id !== 'SE:PLUSGIRO') {
      return true;
    }
    const accountId = payment.payeeFinancialAccount?.id;
    return accountId !== undefined && accountId.trim().length >= 2 && accountId.trim().length <= 8;
  });
  return passed;
}

export const validateSeR010 = schematronRule(rule, evaluateSeR010);
