import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { isGermanSupplierAndCustomer, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'DE-R-009',
  level: 'fatal',
  message: 'The element "Buyer post code" (BT-53) shall be provided.',
} as const satisfies SchematronRule;

function evaluateDeR009(document: PeppolDocument): boolean {
  if (!isGermanSupplierAndCustomer(document)) {
    return true;
  }
  const postalZone = document.accountingCustomerParty.postalAddress.postalZone;
  return typeof postalZone === 'string' && postalZone.trim() !== '';
}

export const validateDeR009 = schematronRule(rule, evaluateDeR009);
