import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getSupplierCountry, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'IT-R-002',
  level: 'fatal',
  message: '[IT-R-002] BT-35 (Seller address line 1) - Italian suppliers MUST provide the postal address line 1',
} as const satisfies SchematronRule;

function evaluateItR002(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'IT') {
    return true;
  }
  const streetName = document.accountingSupplierParty.postalAddress.streetName;
  return typeof streetName === 'string' && streetName.trim() !== '';
}

export const validateItR002 = schematronRule(rule, evaluateItR002);
