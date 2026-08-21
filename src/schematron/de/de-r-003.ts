import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { isCustomerGermany, isSupplierGermany, schematronResult } from '#/schematron/helpers';

const rule = { id: 'DE-R-003', level: 'fatal', message: 'The element "Seller city" (BT-37) shall be provided.' } as const satisfies SchematronRule;

export function validateDeR003(document: PeppolDocument): SchematronRuleResult {
  if (!isSupplierGermany(document) || !isCustomerGermany(document)) {
    return schematronResult(rule, true);
  }
  const cityName = document.accountingSupplierParty.postalAddress.cityName;
  return schematronResult(rule, typeof cityName === 'string' && cityName.trim() !== '');
}
