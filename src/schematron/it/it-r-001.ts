import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'IT-R-001',
  level: 'fatal',
  message: '[IT-R-001] BT-32 (Seller tax registration identifier) - For Italian suppliers BT-32 minimum length 11 and maximum length shall be 16.',
} as const satisfies SchematronRule;

export function validateItR001(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'IT') {
    return schematronResult(rule, true);
  }
  const companyIds =
    document.accountingSupplierParty.partyTaxSchemes?.filter(scheme => scheme.taxSchemeId.id !== 'VAT').map(scheme => scheme.companyId) ?? [];
  const passed = companyIds.every(id => /^[A-Z0-9]{11,16}$/.test(id));
  return schematronResult(rule, passed);
}
