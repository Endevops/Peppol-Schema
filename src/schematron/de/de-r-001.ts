import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { isGermanSupplierAndCustomer, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'DE-R-001',
  level: 'fatal',
  message: 'An invoice shall contain information on "PAYMENT INSTRUCTIONS" (BG-16).',
} as const satisfies SchematronRule;

function evaluateDeR001(document: PeppolDocument): boolean {
  if (!isGermanSupplierAndCustomer(document)) {
    return true;
  }
  return (document.paymentMeans?.length ?? 0) > 0;
}

export const validateDeR001 = schematronRule(rule, evaluateDeR001);
