import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { isCustomerGermany, isSupplierGermany, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'DE-R-025-1',
  level: 'fatal',
  message: 'If "Payment means type code" (BT-81) contains a code for direct debit (59), "DIRECT DEBIT" (BG-19) shall be provided.',
} as const satisfies SchematronRule;

export function validateDeR025_1(document: PeppolDocument): SchematronRuleResult {
  if (!isSupplierGermany(document) || !isCustomerGermany(document)) {
    return schematronResult(rule, true);
  }
  const passed = (document.paymentMeans ?? []).every(payment => {
    if (payment.paymentMeansCode.code !== '59') {
      return true;
    }
    return Boolean(payment.paymentMandate);
  });
  return schematronResult(rule, passed);
}
