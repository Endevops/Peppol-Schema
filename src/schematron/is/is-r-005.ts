import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getCustomerCountry, getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'IS-R-005',
  level: 'fatal',
  message: '[IS-R-005]-If seller and buyer are icelandic then the invoice shall contain the buyers address with street name and zip code',
} as const satisfies SchematronRule;

export function validateIsR005(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'IS' || getCustomerCountry(document) !== 'IS') {
    return schematronResult(rule, true);
  }
  const address = document.accountingCustomerParty.postalAddress;
  return schematronResult(rule, Boolean(address.streetName) && Boolean(address.postalZone));
}
