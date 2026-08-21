import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'PEPPOL-EN16931-P0106',
  level: 'fatal',
  message: 'Tax Category K MUST be used when exemption reason code is VATEX-EU-IC',
} as const satisfies SchematronRule;

export function validatePeppolEn16931P0106(document: PeppolDocument): SchematronRuleResult {
  const taxCategories = document.taxTotals.flatMap(total => (total.taxSubtotals ?? []).map(subtotal => subtotal.taxCategory));
  const passed = taxCategories.every(category => category.taxExemptionReasonCode?.toUpperCase() !== 'VATEX-EU-IC' || category.id === 'K');
  return schematronResult(rule, passed);
}
