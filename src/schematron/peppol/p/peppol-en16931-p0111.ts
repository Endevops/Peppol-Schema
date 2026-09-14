import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'PEPPOL-EN16931-P0111',
  level: 'fatal',
  message: 'Tax Category E MUST be used when exemption reason code is VATEX-EU-J',
} as const satisfies SchematronRule;

function evaluatePeppolEn16931P0111(document: PeppolDocument): boolean {
  const taxCategories = document.taxTotals.flatMap(total => (total.taxSubtotals ?? []).map(subtotal => subtotal.taxCategory));
  const passed = taxCategories.every(category => category.taxExemptionReasonCode?.toUpperCase() !== 'VATEX-EU-J' || category.id === 'E');
  return passed;
}

export const validatePeppolEn16931P0111 = schematronRule(rule, evaluatePeppolEn16931P0111);
