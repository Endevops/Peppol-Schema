import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { isGermanSupplierAndCustomer, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'DE-R-023-2',
  level: 'fatal',
  message: 'If "Payment means type code" (BT-81) contains a code for credit transfer (30, 58), BG-18 and BG-19 shall not be provided.',
} as const satisfies SchematronRule;

const CREDIT_TRANSFER_CODES = new Set(['30', '58']);

function evaluateDeR023_2(document: PeppolDocument): boolean {
  if (!isGermanSupplierAndCustomer(document)) {
    return true;
  }
  const passed = (document.paymentMeans ?? []).every(payment => {
    if (!CREDIT_TRANSFER_CODES.has(payment.paymentMeansCode.code)) {
      return true;
    }
    return !payment.cardAccount && !payment.paymentMandate;
  });
  return passed;
}

export const validateDeR023_2 = schematronRule(rule, evaluateDeR023_2);
