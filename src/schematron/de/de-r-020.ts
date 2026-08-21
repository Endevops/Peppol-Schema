import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { isValidIBAN } from '#/peppol-validations/is-valid-iban';
import { isCustomerGermany, isSupplierGermany, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'DE-R-020',
  level: 'warning',
  message:
    'The element "Debited account identifier" (BT-91) should contain a valid IBAN if code 59 SEPA is provided in "Payment means type code" (BT-81). ',
} as const satisfies SchematronRule;

export function validateDeR020(document: PeppolDocument): SchematronRuleResult {
  if (!isSupplierGermany(document) || !isCustomerGermany(document)) {
    return schematronResult(rule, true);
  }
  const passed = (document.paymentMeans ?? []).every(payment => {
    if (payment.paymentMeansCode.code !== '59') {
      return true;
    }
    const debitedAccountId = payment.paymentMandate?.payerFinancialAccountId?.id;
    return debitedAccountId === undefined || isValidIBAN(debitedAccountId);
  });
  return schematronResult(rule, passed);
}
