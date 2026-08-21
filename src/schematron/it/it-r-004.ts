import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'IT-R-004',
  level: 'fatal',
  message: '[IT-R-004] BT-38 (Seller post code) - Italian suppliers MUST provide the postal address post code',
} as const satisfies SchematronRule;

export function validateItR004(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'IT') {
    return schematronResult(rule, true);
  }
  const postalZone = document.accountingSupplierParty.postalAddress.postalZone;
  return schematronResult(rule, typeof postalZone === 'string' && postalZone.trim() !== '');
}
