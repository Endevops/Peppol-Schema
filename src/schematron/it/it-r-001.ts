import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getSupplierCountry, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'IT-R-001',
  level: 'fatal',
  message: '[IT-R-001] BT-32 (Seller tax registration identifier) - For Italian suppliers BT-32 minimum length 11 and maximum length shall be 16.',
} as const satisfies SchematronRule;

function evaluateItR001(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'IT') {
    return true;
  }
  const companyIds =
    document.accountingSupplierParty.partyTaxSchemes?.filter(scheme => scheme.taxSchemeId.id !== 'VAT').map(scheme => scheme.companyId) ?? [];
  const passed = companyIds.every(id => /^[A-Z0-9]{11,16}$/.test(id));
  return passed;
}

export const validateItR001 = schematronRule(rule, evaluateItR001);
