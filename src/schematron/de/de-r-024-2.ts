import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { isGermanSupplierAndCustomer, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'DE-R-024-2',
  level: 'fatal',
  message: 'If "Payment means type code" (BT-81) contains a code for payment card (48, 54, 55), BG-17 and BG-19 shall not be provided.',
} as const satisfies SchematronRule;

const CARD_CODES = new Set(['48', '54', '55']);

function evaluateDeR024_2(document: PeppolDocument): boolean {
  if (!isGermanSupplierAndCustomer(document)) {
    return true;
  }
  const passed = (document.paymentMeans ?? []).every(payment => {
    if (!CARD_CODES.has(payment.paymentMeansCode.code)) {
      return true;
    }
    return !payment.payeeFinancialAccount && !payment.paymentMandate;
  });
  return passed;
}

export const validateDeR024_2 = schematronRule(rule, evaluateDeR024_2);
