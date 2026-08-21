import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { isCustomerGermany, isSupplierGermany, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'DE-R-001',
  level: 'fatal',
  message: 'An invoice shall contain information on "PAYMENT INSTRUCTIONS" (BG-16).',
} as const satisfies SchematronRule;

export function validateDeR001(document: PeppolDocument): SchematronRuleResult {
  if (!isSupplierGermany(document) || !isCustomerGermany(document)) {
    return schematronResult(rule, true);
  }
  return schematronResult(rule, (document.paymentMeans?.length ?? 0) > 0);
}
