import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { isCustomerGermany, isSupplierGermany, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'DE-R-014',
  level: 'fatal',
  message: 'The element "VAT category rate" (BT-119) shall be provided.',
} as const satisfies SchematronRule;

export function validateDeR014(document: PeppolDocument): SchematronRuleResult {
  if (!isSupplierGermany(document) || !isCustomerGermany(document)) {
    return schematronResult(rule, true);
  }
  const passed = document.taxTotals.every(total =>
    (total.taxSubtotals ?? []).every(subtotal => typeof subtotal.taxCategory.percent === 'number' && subtotal.taxCategory.percent > 0)
  );
  return schematronResult(rule, passed);
}
