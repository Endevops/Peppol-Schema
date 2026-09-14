import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { getSupplierCountry, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'IT-R-004',
  level: 'fatal',
  message: '[IT-R-004] BT-38 (Seller post code) - Italian suppliers MUST provide the postal address post code',
} as const satisfies SchematronRule;

function evaluateItR004(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'IT') {
    return true;
  }
  const postalZone = document.accountingSupplierParty.postalAddress.postalZone;
  return typeof postalZone === 'string' && postalZone.trim() !== '';
}

export const validateItR004 = schematronRule(rule, evaluateItR004);
