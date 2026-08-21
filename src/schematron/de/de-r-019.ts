import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { isValidIBAN } from '#/peppol-validations/is-valid-iban';
import { isCustomerGermany, isSupplierGermany, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'DE-R-019',
  level: 'warning',
  message:
    'The element "Payment account identifier" (BT-84) should contain a valid IBAN if code 58 SEPA is provided in "Payment means type code" (BT-81).',
} as const satisfies SchematronRule;

export function validateDeR019(document: PeppolDocument): SchematronRuleResult {
  if (!isSupplierGermany(document) || !isCustomerGermany(document)) {
    return schematronResult(rule, true);
  }
  const passed = (document.paymentMeans ?? []).every(payment => {
    if (payment.paymentMeansCode.code !== '58') {
      return true;
    }
    const accountId = payment.payeeFinancialAccount?.id;
    return accountId === undefined || isValidIBAN(accountId);
  });
  return schematronResult(rule, passed);
}
