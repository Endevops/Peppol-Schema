import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getTaxSubtotalsWithCode, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-AF-10',
  level: 'fatal',
  message:
    'A VAT breakdown (BG-23) with VAT Category code (BT-118) "IGIC" shall not have a VAT exemption reason code (BT-121) or VAT exemption reason text (BT-120).',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrAf10(document: PeppolDocument): boolean {
  const passed = getTaxSubtotalsWithCode(document, 'L').every(
    st => st.taxCategory.taxExemptionReason === undefined && st.taxCategory.taxExemptionReasonCode === undefined
  );
  return passed;
}

export const validateCenEn16931BrAf10 = schematronRule(rule, evaluateCenEn16931BrAf10);
