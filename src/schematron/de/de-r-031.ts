import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { isGermanSupplierAndCustomer, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'DE-R-031',
  level: 'fatal',
  message: 'If the group "DIRECT DEBIT" (BG-19) is delivered, the element "Debited account identifier" (BT-91) shall be provided.',
} as const satisfies SchematronRule;

function evaluateDeR031(document: PeppolDocument): boolean {
  if (!isGermanSupplierAndCustomer(document)) {
    return true;
  }
  const passed = (document.paymentMeans ?? []).every(payment => {
    if (!payment.paymentMandate) {
      return true;
    }
    return Boolean(payment.paymentMandate.payerFinancialAccountId?.id);
  });
  return passed;
}

export const validateDeR031 = schematronRule(rule, evaluateDeR031);
