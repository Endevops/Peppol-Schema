import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { isValidIBAN } from '#/peppol-validations/is-valid-iban';
import { isGermanSupplierAndCustomer, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'DE-R-020',
  level: 'warning',
  message:
    'The element "Debited account identifier" (BT-91) should contain a valid IBAN if code 59 SEPA is provided in "Payment means type code" (BT-81). ',
} as const satisfies SchematronRule;

function evaluateDeR020(document: PeppolDocument): boolean {
  if (!isGermanSupplierAndCustomer(document)) {
    return true;
  }
  const passed = (document.paymentMeans ?? []).every(payment => {
    if (payment.paymentMeansCode.code !== '59') {
      return true;
    }
    const debitedAccountId = payment.paymentMandate?.payerFinancialAccountId?.id;
    return debitedAccountId === undefined || isValidIBAN(debitedAccountId);
  });
  return passed;
}

export const validateDeR020 = schematronRule(rule, evaluateDeR020);
