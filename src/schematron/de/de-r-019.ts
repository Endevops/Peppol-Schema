import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { isValidIBAN } from '#/peppol-validations/is-valid-iban';
import { isGermanSupplierAndCustomer, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'DE-R-019',
  level: 'warning',
  message:
    'The element "Payment account identifier" (BT-84) should contain a valid IBAN if code 58 SEPA is provided in "Payment means type code" (BT-81).',
} as const satisfies SchematronRule;

function evaluateDeR019(document: PeppolDocument): boolean {
  if (!isGermanSupplierAndCustomer(document)) {
    return true;
  }
  const passed = (document.paymentMeans ?? []).every(payment => {
    if (payment.paymentMeansCode.code !== '58') {
      return true;
    }
    const accountId = payment.payeeFinancialAccount?.id;
    return accountId === undefined || isValidIBAN(accountId);
  });
  return passed;
}

export const validateDeR019 = schematronRule(rule, evaluateDeR019);
