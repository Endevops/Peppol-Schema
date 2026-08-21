import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'NL-R-006',
  level: 'fatal',
  message:
    "[NL-R-006] For suppliers in the Netherlands, if the fiscal representative is in the Netherlands, the representative's address (cac:TaxRepresentativeParty/cac:PostalAddress) MUST contain street name (cbc:StreetName), city (cbc:CityName) and post code (cbc:PostalZone)",
} as const satisfies SchematronRule;

export function validateNlR006(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'NL') {
    return schematronResult(rule, true);
  }
  const taxRep = document.taxRepresentativeParty;
  if (!taxRep || taxRep.postalAddress.countryCode.identificationCode.toUpperCase() !== 'NL') {
    return schematronResult(rule, true);
  }
  const address = taxRep.postalAddress;
  return schematronResult(rule, Boolean(address.streetName) && Boolean(address.cityName) && Boolean(address.postalZone));
}
