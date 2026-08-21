import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { isCustomerGermany, isSupplierGermany, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'DE-R-027',
  level: 'warning',
  message: '"Seller contact telephone number" (BT-42) should contain a valid telephone number. A valid telephone should consist of 3 digits minimum.',
} as const satisfies SchematronRule;

const TELEPHONE_REGEX = /.*([0-9].*){3,}.*/;

export function validateDeR027(document: PeppolDocument): SchematronRuleResult {
  if (!isSupplierGermany(document) || !isCustomerGermany(document)) {
    return schematronResult(rule, true);
  }
  const telephone = document.accountingSupplierParty.contact?.telephone;
  return schematronResult(rule, telephone === undefined || TELEPHONE_REGEX.test(telephone.trim()));
}
