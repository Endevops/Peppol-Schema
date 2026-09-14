import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { isGermanSupplierAndCustomer, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'DE-R-028',
  level: 'warning',
  message:
    '"Seller contact email address" (BT-43) should contain exactly one @-sign, which should not be framed by a whitespace or a dot but by at least two characters on each side. A dot should not be the first or last character.',
} as const satisfies SchematronRule;

const EMAIL_REGEX =
  /^[a-zA-Z0-9!#$%&"*+/=?^_`{|}~-]+(\.[a-zA-Z0-9!#$%&"*+/=?^_`{|}~-]+)*@([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?$/;

function evaluateDeR028(document: PeppolDocument): boolean {
  if (!isGermanSupplierAndCustomer(document)) {
    return true;
  }
  const email = document.accountingSupplierParty.contact?.electronicMail;
  return email === undefined || EMAIL_REGEX.test(email.trim());
}

export const validateDeR028 = schematronRule(rule, evaluateDeR028);
