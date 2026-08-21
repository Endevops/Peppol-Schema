import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { isCustomerGermany, isSupplierGermany, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'DE-R-028',
  level: 'warning',
  message:
    '"Seller contact email address" (BT-43) should contain exactly one @-sign, which should not be framed by a whitespace or a dot but by at least two characters on each side. A dot should not be the first or last character.',
} as const satisfies SchematronRule;

const EMAIL_REGEX =
  /^[a-zA-Z0-9!#$%&"*+/=?^_`{|}~-]+(\.[a-zA-Z0-9!#$%&"*+/=?^_`{|}~-]+)*@([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?$/;

export function validateDeR028(document: PeppolDocument): SchematronRuleResult {
  if (!isSupplierGermany(document) || !isCustomerGermany(document)) {
    return schematronResult(rule, true);
  }
  const email = document.accountingSupplierParty.contact?.electronicMail;
  return schematronResult(rule, email === undefined || EMAIL_REGEX.test(email.trim()));
}
