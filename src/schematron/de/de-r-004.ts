import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { isCustomerGermany, isSupplierGermany, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'DE-R-004',
  level: 'fatal',
  message: 'The element "Seller post code" (BT-38) shall be provided.',
} as const satisfies SchematronRule;

export function validateDeR004(document: PeppolDocument): SchematronRuleResult {
  if (!isSupplierGermany(document) || !isCustomerGermany(document)) {
    return schematronResult(rule, true);
  }
  const postalZone = document.accountingSupplierParty.postalAddress.postalZone;
  return schematronResult(rule, typeof postalZone === 'string' && postalZone.trim() !== '');
}
