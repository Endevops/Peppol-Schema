import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { isCustomerGermany, isSupplierGermany, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'DE-R-025-2',
  level: 'fatal',
  message: 'If "Payment means type code" (BT-81) contains a code for direct debit (59), BG-17 and BG-18 shall not be provided.',
} as const satisfies SchematronRule;

export function validateDeR025_2(document: PeppolDocument): SchematronRuleResult {
  if (!isSupplierGermany(document) || !isCustomerGermany(document)) {
    return schematronResult(rule, true);
  }
  const passed = (document.paymentMeans ?? []).every(payment => {
    if (payment.paymentMeansCode.code !== '59') {
      return true;
    }
    return !payment.payeeFinancialAccount && !payment.cardAccount;
  });
  return schematronResult(rule, passed);
}
