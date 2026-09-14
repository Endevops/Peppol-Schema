import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { isGermanSupplierAndCustomer, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'DE-R-010',
  level: 'fatal',
  message: 'The element "Deliver to city" (BT-77) shall be provided if the group "DELIVER TO ADDRESS" (BG-15) is delivered.',
} as const satisfies SchematronRule;

function evaluateDeR010(document: PeppolDocument): boolean {
  if (!isGermanSupplierAndCustomer(document)) {
    return true;
  }
  const address = document.delivery?.deliveryLocation?.address;
  if (!address) {
    return true;
  }
  const cityName = address.cityName;
  return typeof cityName === 'string' && cityName.trim() !== '';
}

export const validateDeR010 = schematronRule(rule, evaluateDeR010);
