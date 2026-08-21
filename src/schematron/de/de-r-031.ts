import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { isCustomerGermany, isSupplierGermany, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'DE-R-031',
  level: 'fatal',
  message: 'If the group "DIRECT DEBIT" (BG-19) is delivered, the element "Debited account identifier" (BT-91) shall be provided.',
} as const satisfies SchematronRule;

export function validateDeR031(document: PeppolDocument): SchematronRuleResult {
  if (!isSupplierGermany(document) || !isCustomerGermany(document)) {
    return schematronResult(rule, true);
  }
  const passed = (document.paymentMeans ?? []).every(payment => {
    if (!payment.paymentMandate) {
      return true;
    }
    return Boolean(payment.paymentMandate.payerFinancialAccountId?.id);
  });
  return schematronResult(rule, passed);
}
