import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { isCustomerGermany, isSupplierGermany, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'DE-R-007',
  level: 'fatal',
  message: 'The element "Seller contact email address" (BT-43) shall be provided.',
} as const satisfies SchematronRule;

export function validateDeR007(document: PeppolDocument): SchematronRuleResult {
  if (!isSupplierGermany(document) || !isCustomerGermany(document)) {
    return schematronResult(rule, true);
  }
  const email = document.accountingSupplierParty.contact?.electronicMail;
  return schematronResult(rule, typeof email === 'string' && email.trim() !== '');
}
