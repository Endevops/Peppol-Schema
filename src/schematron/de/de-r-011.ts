import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { isGermanSupplierAndCustomer, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'DE-R-011',
  level: 'fatal',
  message: 'The element "Deliver to post code" (BT-78) shall be provided if the group "DELIVER TO ADDRESS" (BG-15) is delivered.',
} as const satisfies SchematronRule;

function evaluateDeR011(document: PeppolDocument): boolean {
  if (!isGermanSupplierAndCustomer(document)) {
    return true;
  }
  const address = document.delivery?.deliveryLocation?.address;
  if (!address) {
    return true;
  }
  const postalZone = address.postalZone;
  return typeof postalZone === 'string' && postalZone.trim() !== '';
}

export const validateDeR011 = schematronRule(rule, evaluateDeR011);
