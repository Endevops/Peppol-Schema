import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { isCustomerGermany, isSupplierGermany, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'DE-R-006',
  level: 'fatal',
  message: 'The element "Seller contact telephone number" (BT-42) shall be provided.',
} as const satisfies SchematronRule;

export function validateDeR006(document: PeppolDocument): SchematronRuleResult {
  if (!isSupplierGermany(document) || !isCustomerGermany(document)) {
    return schematronResult(rule, true);
  }
  const telephone = document.accountingSupplierParty.contact?.telephone;
  return schematronResult(rule, typeof telephone === 'string' && telephone.trim() !== '');
}
