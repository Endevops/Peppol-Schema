import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'IS-R-003',
  level: 'fatal',
  message: '[IS-R-003]-If seller is icelandic then it shall contain his address with street name and zip code',
} as const satisfies SchematronRule;

export function validateIsR003(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'IS') {
    return schematronResult(rule, true);
  }
  const address = document.accountingSupplierParty.postalAddress;
  return schematronResult(rule, Boolean(address.streetName) && Boolean(address.postalZone));
}
