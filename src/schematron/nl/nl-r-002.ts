import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { getSupplierCountry, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'NL-R-002',
  level: 'fatal',
  message:
    "[NL-R-002] For suppliers in the Netherlands the supplier's address (cac:AccountingSupplierParty/cac:Party/cac:PostalAddress) MUST contain street name (cbc:StreetName), city (cbc:CityName) and post code (cbc:PostalZone)",
} as const satisfies SchematronRule;

function evaluateNlR002(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'NL') {
    return true;
  }
  const address = document.accountingSupplierParty.postalAddress;
  return Boolean(address.streetName) && Boolean(address.cityName) && Boolean(address.postalZone);
}

export const validateNlR002 = schematronRule(rule, evaluateNlR002);
