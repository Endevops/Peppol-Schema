import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { getTaxSubtotalsWithCode, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-O-10',
  level: 'fatal',
  message:
    'A VAT breakdown (BG-23) with VAT Category code (BT-118) " Not subject to VAT" shall have a VAT exemption reason code (BT-121), meaning " Not subject to VAT" or a VAT exemption reason text (BT-120) " Not subject to VAT" (or the equivalent standard text in another language).',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrO10(document: PeppolDocument): boolean {
  const passed = getTaxSubtotalsWithCode(document, 'O').every(
    st => typeof st.taxCategory.taxExemptionReason === 'string' || typeof st.taxCategory.taxExemptionReasonCode === 'string'
  );
  return passed;
}

export const validateCenEn16931BrO10 = schematronRule(rule, evaluateCenEn16931BrO10);
