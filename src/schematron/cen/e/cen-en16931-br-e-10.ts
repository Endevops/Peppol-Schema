import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getTaxSubtotalsWithCode, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-E-10',
  level: 'fatal',
  message:
    'A VAT breakdown (BG-23) with VAT Category code (BT-118) "Exempt from VAT" shall have a VAT exemption reason code (BT-121) or a VAT exemption reason text (BT-120).',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrE10(document: PeppolDocument): boolean {
  const passed = getTaxSubtotalsWithCode(document, 'E').every(
    st => typeof st.taxCategory.taxExemptionReason === 'string' || typeof st.taxCategory.taxExemptionReasonCode === 'string'
  );
  return passed;
}

export const validateCenEn16931BrE10 = schematronRule(rule, evaluateCenEn16931BrE10);
