import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getTaxSubtotalsWithCode, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-IC-10',
  level: 'fatal',
  message:
    'A VAT breakdown (BG-23) with the VAT Category code (BT-118) "Intra-community supply" shall have a VAT exemption reason code (BT-121), meaning "Intra-community supply" or the VAT exemption reason text (BT-120) "Intra-community supply" (or the equivalent standard text in another language).',
} as const satisfies SchematronRule;

export function validateCenEn16931BrIc10(document: PeppolDocument): SchematronRuleResult {
  const passed = getTaxSubtotalsWithCode(document, 'K').every(
    st => typeof st.taxCategory.taxExemptionReason === 'string' || typeof st.taxCategory.taxExemptionReasonCode === 'string'
  );
  return schematronResult(rule, passed);
}
