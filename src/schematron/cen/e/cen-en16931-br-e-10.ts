import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getTaxSubtotalsWithCode, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-E-10',
  level: 'fatal',
  message:
    'A VAT breakdown (BG-23) with VAT Category code (BT-118) "Exempt from VAT" shall have a VAT exemption reason code (BT-121) or a VAT exemption reason text (BT-120).',
} as const satisfies SchematronRule;

export function validateCenEn16931BrE10(document: PeppolDocument): SchematronRuleResult {
  const passed = getTaxSubtotalsWithCode(document, 'E').every(
    st => typeof st.taxCategory.taxExemptionReason === 'string' || typeof st.taxCategory.taxExemptionReasonCode === 'string'
  );
  return schematronResult(rule, passed);
}
