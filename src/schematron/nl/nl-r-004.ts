import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { getCustomerCountry, getSupplierCountry, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'NL-R-004',
  level: 'fatal',
  message:
    '[NL-R-004] For suppliers in the Netherlands, if the customer is in the Netherlands, the customer address (cac:AccountingCustomerParty/cac:Party/cac:PostalAddress) MUST contain the street name (cbc:StreetName), the city (cbc:CityName) and post code (cbc:PostalZone)',
} as const satisfies SchematronRule;

function evaluateNlR004(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'NL' || getCustomerCountry(document) !== 'NL') {
    return true;
  }
  const address = document.accountingCustomerParty.postalAddress;
  return Boolean(address.streetName) && Boolean(address.cityName) && Boolean(address.postalZone);
}

export const validateNlR004 = schematronRule(rule, evaluateNlR004);
