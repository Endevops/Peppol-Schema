import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { isCustomerGermany, isSupplierGermany, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'DE-R-015',
  level: 'fatal',
  message: 'The element "Buyer reference" (BT-10) shall be provided.',
} as const satisfies SchematronRule;

export function validateDeR015(document: PeppolDocument): SchematronRuleResult {
  if (!isSupplierGermany(document) || !isCustomerGermany(document)) {
    return schematronResult(rule, true);
  }
  const buyerReference = document.buyerReference;
  return schematronResult(rule, typeof buyerReference === 'string' && buyerReference.trim() !== '');
}
