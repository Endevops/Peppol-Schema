import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'IT-R-003',
  level: 'fatal',
  message: '[IT-R-003] BT-37 (Seller city) - Italian suppliers MUST provide the postal address city',
} as const satisfies SchematronRule;

export function validateItR003(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'IT') {
    return schematronResult(rule, true);
  }
  const cityName = document.accountingSupplierParty.postalAddress.cityName;
  return schematronResult(rule, typeof cityName === 'string' && cityName.trim() !== '');
}
