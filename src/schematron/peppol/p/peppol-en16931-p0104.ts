import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'PEPPOL-EN16931-P0104',
  level: 'fatal',
  message: 'Tax Category G MUST be used when exemption reason code is VATEX-EU-G',
} as const satisfies SchematronRule;

function evaluatePeppolEn16931P0104(document: PeppolDocument): boolean {
  const taxCategories = document.taxTotals.flatMap(total => (total.taxSubtotals ?? []).map(subtotal => subtotal.taxCategory));
  const passed = taxCategories.every(category => category.taxExemptionReasonCode?.toUpperCase() !== 'VATEX-EU-G' || category.id === 'G');
  return passed;
}

export const validatePeppolEn16931P0104 = schematronRule(rule, evaluatePeppolEn16931P0104);
