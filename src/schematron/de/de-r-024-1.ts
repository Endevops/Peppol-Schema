import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { isGermanSupplierAndCustomer, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'DE-R-024-1',
  level: 'fatal',
  message:
    'If "Payment means type code" (BT-81) contains a code for payment card (48, 54, 55), "PAYMENT CARD INFORMATION" (BG-18) shall be provided.',
} as const satisfies SchematronRule;

const CARD_CODES = new Set(['48', '54', '55']);

function evaluateDeR024_1(document: PeppolDocument): boolean {
  if (!isGermanSupplierAndCustomer(document)) {
    return true;
  }
  const passed = (document.paymentMeans ?? []).every(payment => {
    if (!CARD_CODES.has(payment.paymentMeansCode.code)) {
      return true;
    }
    return Boolean(payment.cardAccount);
  });
  return passed;
}

export const validateDeR024_1 = schematronRule(rule, evaluateDeR024_1);
