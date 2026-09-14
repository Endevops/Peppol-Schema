import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { isGermanSupplierAndCustomer, schematronRule } from '#/schematron/helpers.ts';

const rule = { id: 'DE-R-008', level: 'fatal', message: 'The element "Buyer city" (BT-52) shall be provided.' } as const satisfies SchematronRule;

function evaluateDeR008(document: PeppolDocument): boolean {
  if (!isGermanSupplierAndCustomer(document)) {
    return true;
  }
  const cityName = document.accountingCustomerParty.postalAddress.cityName;
  return typeof cityName === 'string' && cityName.trim() !== '';
}

export const validateDeR008 = schematronRule(rule, evaluateDeR008);
