import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { isGermanSupplierAndCustomer, schematronRule } from '#/schematron/helpers';

const rule = { id: 'DE-R-003', level: 'fatal', message: 'The element "Seller city" (BT-37) shall be provided.' } as const satisfies SchematronRule;

function evaluateDeR003(document: PeppolDocument): boolean {
  if (!isGermanSupplierAndCustomer(document)) {
    return true;
  }
  const cityName = document.accountingSupplierParty.postalAddress.cityName;
  return typeof cityName === 'string' && cityName.trim() !== '';
}

export const validateDeR003 = schematronRule(rule, evaluateDeR003);
