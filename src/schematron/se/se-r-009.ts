import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getSupplierCountry, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'SE-R-009',
  level: 'warning',
  message: 'For Swedish suppliers using Bankgiro, the Account ID must have 7-8 characters',
} as const satisfies SchematronRule;

function evaluateSeR009(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'SE') {
    return true;
  }
  const passed = (document.paymentMeans ?? []).every(payment => {
    if (payment.paymentMeansCode.code !== '30' || payment.payeeFinancialAccount?.financialInstitutionBranch?.id !== 'SE:BANKGIRO') {
      return true;
    }
    const accountId = payment.payeeFinancialAccount?.id;
    return accountId !== undefined && (accountId.trim().length === 7 || accountId.trim().length === 8);
  });
  return passed;
}

export const validateSeR009 = schematronRule(rule, evaluateSeR009);
