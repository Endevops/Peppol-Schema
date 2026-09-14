import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { isGermanSupplierAndCustomer, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'DE-R-023-1',
  level: 'fatal',
  message: 'If "Payment means type code" (BT-81) contains a code for credit transfer (30, 58), "CREDIT TRANSFER" (BG-17) shall be provided.',
} as const satisfies SchematronRule;

const CREDIT_TRANSFER_CODES = new Set(['30', '58']);

function evaluateDeR023_1(document: PeppolDocument): boolean {
  if (!isGermanSupplierAndCustomer(document)) {
    return true;
  }
  const passed = (document.paymentMeans ?? []).every(payment => {
    if (!CREDIT_TRANSFER_CODES.has(payment.paymentMeansCode.code)) {
      return true;
    }
    return Boolean(payment.payeeFinancialAccount);
  });
  return passed;
}

export const validateDeR023_1 = schematronRule(rule, evaluateDeR023_1);
