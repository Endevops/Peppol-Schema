import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { isGermanSupplierAndCustomer, schematronResult } from '#/schematron/helpers';

const rule = { id: 'DE-R-002', level: 'fatal', message: 'The group "SELLER CONTACT" (BG-6) shall be provided.' } as const satisfies SchematronRule;

export function validateDeR002(document: PeppolDocument): SchematronRuleResult {
  if (!isGermanSupplierAndCustomer(document)) {
    return schematronResult(rule, true);
  }
  return schematronResult(rule, Boolean(document.accountingSupplierParty.contact));
}
