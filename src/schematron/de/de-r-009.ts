import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { isCustomerGermany, isSupplierGermany, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'DE-R-009',
  level: 'fatal',
  message: 'The element "Buyer post code" (BT-53) shall be provided.',
} as const satisfies SchematronRule;

export function validateDeR009(document: PeppolDocument): SchematronRuleResult {
  if (!isSupplierGermany(document) || !isCustomerGermany(document)) {
    return schematronResult(rule, true);
  }
  const postalZone = document.accountingCustomerParty.postalAddress.postalZone;
  return schematronResult(rule, typeof postalZone === 'string' && postalZone.trim() !== '');
}
