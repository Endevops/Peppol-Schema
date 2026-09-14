import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { isGermanSupplierAndCustomer, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'DE-R-014',
  level: 'fatal',
  message: 'The element "VAT category rate" (BT-119) shall be provided.',
} as const satisfies SchematronRule;

function evaluateDeR014(document: PeppolDocument): boolean {
  if (!isGermanSupplierAndCustomer(document)) {
    return true;
  }
  const passed = document.taxTotals.every(total =>
    (total.taxSubtotals ?? []).every(subtotal => typeof subtotal.taxCategory.percent === 'number' && subtotal.taxCategory.percent > 0)
  );
  return passed;
}

export const validateDeR014 = schematronRule(rule, evaluateDeR014);
