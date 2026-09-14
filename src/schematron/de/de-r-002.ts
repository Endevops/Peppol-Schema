import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { isGermanSupplierAndCustomer, schematronRule } from '#/schematron/helpers';

const rule = { id: 'DE-R-002', level: 'fatal', message: 'The group "SELLER CONTACT" (BG-6) shall be provided.' } as const satisfies SchematronRule;

function evaluateDeR002(document: PeppolDocument): boolean {
  if (!isGermanSupplierAndCustomer(document)) {
    return true;
  }
  return Boolean(document.accountingSupplierParty.contact);
}

export const validateDeR002 = schematronRule(rule, evaluateDeR002);
