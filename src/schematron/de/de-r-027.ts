import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { isGermanSupplierAndCustomer, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'DE-R-027',
  level: 'warning',
  message: '"Seller contact telephone number" (BT-42) should contain a valid telephone number. A valid telephone should consist of 3 digits minimum.',
} as const satisfies SchematronRule;

const TELEPHONE_REGEX = /.*([0-9].*){3,}.*/;

function evaluateDeR027(document: PeppolDocument): boolean {
  if (!isGermanSupplierAndCustomer(document)) {
    return true;
  }
  const telephone = document.accountingSupplierParty.contact?.telephone;
  return telephone === undefined || TELEPHONE_REGEX.test(telephone.trim());
}

export const validateDeR027 = schematronRule(rule, evaluateDeR027);
