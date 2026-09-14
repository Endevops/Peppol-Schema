import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getCustomerCountry, getSupplierCountry, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'IS-R-005',
  level: 'fatal',
  message: '[IS-R-005]-If seller and buyer are icelandic then the invoice shall contain the buyers address with street name and zip code',
} as const satisfies SchematronRule;

function evaluateIsR005(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'IS' || getCustomerCountry(document) !== 'IS') {
    return true;
  }
  const address = document.accountingCustomerParty.postalAddress;
  return Boolean(address.streetName) && Boolean(address.postalZone);
}

export const validateIsR005 = schematronRule(rule, evaluateIsR005);
