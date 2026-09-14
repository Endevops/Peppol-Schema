import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { isGermanSupplierAndCustomer, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'DE-R-006',
  level: 'fatal',
  message: 'The element "Seller contact telephone number" (BT-42) shall be provided.',
} as const satisfies SchematronRule;

function evaluateDeR006(document: PeppolDocument): boolean {
  if (!isGermanSupplierAndCustomer(document)) {
    return true;
  }
  const telephone = document.accountingSupplierParty.contact?.telephone;
  return typeof telephone === 'string' && telephone.trim() !== '';
}

export const validateDeR006 = schematronRule(rule, evaluateDeR006);
