import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { getTaxSubtotalsWithCode, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-IC-10',
  level: 'fatal',
  message:
    'A VAT breakdown (BG-23) with the VAT Category code (BT-118) "Intra-community supply" shall have a VAT exemption reason code (BT-121), meaning "Intra-community supply" or the VAT exemption reason text (BT-120) "Intra-community supply" (or the equivalent standard text in another language).',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrIc10(document: PeppolDocument): boolean {
  const passed = getTaxSubtotalsWithCode(document, 'K').every(
    st => typeof st.taxCategory.taxExemptionReason === 'string' || typeof st.taxCategory.taxExemptionReasonCode === 'string'
  );
  return passed;
}

export const validateCenEn16931BrIc10 = schematronRule(rule, evaluateCenEn16931BrIc10);
