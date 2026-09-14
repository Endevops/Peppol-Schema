import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { isGermanSupplierAndCustomer, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'DE-R-005',
  level: 'fatal',
  message: 'The element "Seller contact point" (BT-41) shall be provided.',
} as const satisfies SchematronRule;

function evaluateDeR005(document: PeppolDocument): boolean {
  if (!isGermanSupplierAndCustomer(document)) {
    return true;
  }
  const name = document.accountingSupplierParty.contact?.name;
  return typeof name === 'string' && name.trim() !== '';
}

export const validateDeR005 = schematronRule(rule, evaluateDeR005);
