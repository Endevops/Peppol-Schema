import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { isGermanSupplierAndCustomer, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'DE-R-007',
  level: 'fatal',
  message: 'The element "Seller contact email address" (BT-43) shall be provided.',
} as const satisfies SchematronRule;

function evaluateDeR007(document: PeppolDocument): boolean {
  if (!isGermanSupplierAndCustomer(document)) {
    return true;
  }
  const email = document.accountingSupplierParty.contact?.electronicMail;
  return typeof email === 'string' && email.trim() !== '';
}

export const validateDeR007 = schematronRule(rule, evaluateDeR007);
