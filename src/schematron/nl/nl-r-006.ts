import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getSupplierCountry, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'NL-R-006',
  level: 'fatal',
  message:
    "[NL-R-006] For suppliers in the Netherlands, if the fiscal representative is in the Netherlands, the representative's address (cac:TaxRepresentativeParty/cac:PostalAddress) MUST contain street name (cbc:StreetName), city (cbc:CityName) and post code (cbc:PostalZone)",
} as const satisfies SchematronRule;

function evaluateNlR006(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'NL') {
    return true;
  }
  const taxRep = document.taxRepresentativeParty;
  if (!taxRep || taxRep.postalAddress.countryCode.identificationCode.toUpperCase() !== 'NL') {
    return true;
  }
  const address = taxRep.postalAddress;
  return Boolean(address.streetName) && Boolean(address.cityName) && Boolean(address.postalZone);
}

export const validateNlR006 = schematronRule(rule, evaluateNlR006);
