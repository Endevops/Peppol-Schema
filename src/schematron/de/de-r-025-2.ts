import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { isGermanSupplierAndCustomer, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'DE-R-025-2',
  level: 'fatal',
  message: 'If "Payment means type code" (BT-81) contains a code for direct debit (59), BG-17 and BG-18 shall not be provided.',
} as const satisfies SchematronRule;

function evaluateDeR025_2(document: PeppolDocument): boolean {
  if (!isGermanSupplierAndCustomer(document)) {
    return true;
  }
  const passed = (document.paymentMeans ?? []).every(payment => {
    if (payment.paymentMeansCode.code !== '59') {
      return true;
    }
    return !payment.payeeFinancialAccount && !payment.cardAccount;
  });
  return passed;
}

export const validateDeR025_2 = schematronRule(rule, evaluateDeR025_2);
