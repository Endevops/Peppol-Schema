import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { isGermanSupplierAndCustomer, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'DE-R-015',
  level: 'fatal',
  message: 'The element "Buyer reference" (BT-10) shall be provided.',
} as const satisfies SchematronRule;

function evaluateDeR015(document: PeppolDocument): boolean {
  if (!isGermanSupplierAndCustomer(document)) {
    return true;
  }
  const buyerReference = document.buyerReference;
  return typeof buyerReference === 'string' && buyerReference.trim() !== '';
}

export const validateDeR015 = schematronRule(rule, evaluateDeR015);
