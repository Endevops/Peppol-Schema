import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { getSupplierCountry, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'IT-R-003',
  level: 'fatal',
  message: '[IT-R-003] BT-37 (Seller city) - Italian suppliers MUST provide the postal address city',
} as const satisfies SchematronRule;

function evaluateItR003(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'IT') {
    return true;
  }
  const cityName = document.accountingSupplierParty.postalAddress.cityName;
  return typeof cityName === 'string' && cityName.trim() !== '';
}

export const validateItR003 = schematronRule(rule, evaluateItR003);
