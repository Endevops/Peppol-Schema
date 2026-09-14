import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { isDanishSupplierAndCustomer, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'DK-R-006',
  level: 'fatal',
  message: 'For Danish suppliers bank account and registration account is mandatory if payment means is 31 or 42',
} as const satisfies SchematronRule;

const REQUIRED_CODES = new Set(['31', '42']);

function evaluateDkR006(document: PeppolDocument): boolean {
  if (!isDanishSupplierAndCustomer(document)) {
    return true;
  }
  const passed = (document.paymentMeans ?? []).every(payment => {
    if (!REQUIRED_CODES.has(payment.paymentMeansCode.code)) {
      return true;
    }
    const accountId = payment.payeeFinancialAccount?.id;
    const branchId = payment.payeeFinancialAccount?.financialInstitutionBranch?.id;
    return typeof accountId === 'string' && accountId.trim() !== '' && typeof branchId === 'string' && branchId.trim() !== '';
  });
  return passed;
}

export const validateDkR006 = schematronRule(rule, evaluateDkR006);
