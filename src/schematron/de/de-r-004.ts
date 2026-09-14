import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { isGermanSupplierAndCustomer, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'DE-R-004',
  level: 'fatal',
  message: 'The element "Seller post code" (BT-38) shall be provided.',
} as const satisfies SchematronRule;

function evaluateDeR004(document: PeppolDocument): boolean {
  if (!isGermanSupplierAndCustomer(document)) {
    return true;
  }
  const postalZone = document.accountingSupplierParty.postalAddress.postalZone;
  return typeof postalZone === 'string' && postalZone.trim() !== '';
}

export const validateDeR004 = schematronRule(rule, evaluateDeR004);
