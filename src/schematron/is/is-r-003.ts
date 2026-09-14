import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { getSupplierCountry, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'IS-R-003',
  level: 'fatal',
  message: '[IS-R-003]-If seller is icelandic then it shall contain his address with street name and zip code',
} as const satisfies SchematronRule;

function evaluateIsR003(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'IS') {
    return true;
  }
  const address = document.accountingSupplierParty.postalAddress;
  return Boolean(address.streetName) && Boolean(address.postalZone);
}

export const validateIsR003 = schematronRule(rule, evaluateIsR003);
