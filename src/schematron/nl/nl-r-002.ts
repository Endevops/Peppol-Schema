import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'NL-R-002',
  level: 'fatal',
  message:
    "[NL-R-002] For suppliers in the Netherlands the supplier's address (cac:AccountingSupplierParty/cac:Party/cac:PostalAddress) MUST contain street name (cbc:StreetName), city (cbc:CityName) and post code (cbc:PostalZone)",
} as const satisfies SchematronRule;

export function validateNlR002(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'NL') {
    return schematronResult(rule, true);
  }
  const address = document.accountingSupplierParty.postalAddress;
  return schematronResult(rule, Boolean(address.streetName) && Boolean(address.cityName) && Boolean(address.postalZone));
}
