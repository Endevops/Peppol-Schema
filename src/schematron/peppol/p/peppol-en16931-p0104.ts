import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'PEPPOL-EN16931-P0104',
  level: 'fatal',
  message: 'Tax Category G MUST be used when exemption reason code is VATEX-EU-G',
} as const satisfies SchematronRule;

export function validatePeppolEn16931P0104(document: PeppolDocument): SchematronRuleResult {
  const taxCategories = document.taxTotals.flatMap(total => (total.taxSubtotals ?? []).map(subtotal => subtotal.taxCategory));
  const passed = taxCategories.every(category => category.taxExemptionReasonCode?.toUpperCase() !== 'VATEX-EU-G' || category.id === 'G');
  return schematronResult(rule, passed);
}
