import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { isCustomerGermany, isSupplierGermany, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'DE-R-005',
  level: 'fatal',
  message: 'The element "Seller contact point" (BT-41) shall be provided.',
} as const satisfies SchematronRule;

export function validateDeR005(document: PeppolDocument): SchematronRuleResult {
  if (!isSupplierGermany(document) || !isCustomerGermany(document)) {
    return schematronResult(rule, true);
  }
  const name = document.accountingSupplierParty.contact?.name;
  return schematronResult(rule, typeof name === 'string' && name.trim() !== '');
}
