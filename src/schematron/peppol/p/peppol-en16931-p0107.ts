import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'PEPPOL-EN16931-P0107',
  level: 'fatal',
  message: 'Tax Category AE MUST be used when exemption reason code is VATEX-EU-AE',
} as const satisfies SchematronRule;

function evaluatePeppolEn16931P0107(document: PeppolDocument): boolean {
  const taxCategories = document.taxTotals.flatMap(total => (total.taxSubtotals ?? []).map(subtotal => subtotal.taxCategory));
  const passed = taxCategories.every(category => category.taxExemptionReasonCode?.toUpperCase() !== 'VATEX-EU-AE' || category.id === 'AE');
  return passed;
}

export const validatePeppolEn16931P0107 = schematronRule(rule, evaluatePeppolEn16931P0107);
