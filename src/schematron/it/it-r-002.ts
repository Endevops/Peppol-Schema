import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'IT-R-002',
  level: 'fatal',
  message: '[IT-R-002] BT-35 (Seller address line 1) - Italian suppliers MUST provide the postal address line 1',
} as const satisfies SchematronRule;

export function validateItR002(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'IT') {
    return schematronResult(rule, true);
  }
  const streetName = document.accountingSupplierParty.postalAddress.streetName;
  return schematronResult(rule, typeof streetName === 'string' && streetName.trim() !== '');
}
