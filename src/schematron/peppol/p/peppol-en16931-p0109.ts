import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'PEPPOL-EN16931-P0109',
  level: 'fatal',
  message: 'Tax Category E MUST be used when exemption reason code is VATEX-EU-F',
} as const satisfies SchematronRule;

function evaluatePeppolEn16931P0109(document: PeppolDocument): boolean {
  const taxCategories = document.taxTotals.flatMap(total => (total.taxSubtotals ?? []).map(subtotal => subtotal.taxCategory));
  const passed = taxCategories.every(category => category.taxExemptionReasonCode?.toUpperCase() !== 'VATEX-EU-F' || category.id === 'E');
  return passed;
}

export const validatePeppolEn16931P0109 = schematronRule(rule, evaluatePeppolEn16931P0109);
