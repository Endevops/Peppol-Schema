import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getCustomerCountry, getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'NL-R-004',
  level: 'fatal',
  message:
    '[NL-R-004] For suppliers in the Netherlands, if the customer is in the Netherlands, the customer address (cac:AccountingCustomerParty/cac:Party/cac:PostalAddress) MUST contain the street name (cbc:StreetName), the city (cbc:CityName) and post code (cbc:PostalZone)',
} as const satisfies SchematronRule;

export function validateNlR004(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'NL' || getCustomerCountry(document) !== 'NL') {
    return schematronResult(rule, true);
  }
  const address = document.accountingCustomerParty.postalAddress;
  return schematronResult(rule, Boolean(address.streetName) && Boolean(address.cityName) && Boolean(address.postalZone));
}
