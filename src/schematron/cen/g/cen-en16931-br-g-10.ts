import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getTaxSubtotalsWithCode, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-G-10',
  level: 'fatal',
  message:
    'A VAT breakdown (BG-23) with the VAT Category code (BT-118) "Export outside the EU" shall have a VAT exemption reason code (BT-121), meaning "Export outside the EU" or the VAT exemption reason text (BT-120) "Export outside the EU" (or the equivalent standard text in another language).',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrG10(document: PeppolDocument): boolean {
  const passed = getTaxSubtotalsWithCode(document, 'G').every(
    st => typeof st.taxCategory.taxExemptionReason === 'string' || typeof st.taxCategory.taxExemptionReasonCode === 'string'
  );
  return passed;
}

export const validateCenEn16931BrG10 = schematronRule(rule, evaluateCenEn16931BrG10);
