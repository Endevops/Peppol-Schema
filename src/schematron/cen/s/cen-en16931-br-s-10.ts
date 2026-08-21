import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getTaxSubtotalsWithCode, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-S-10',
  level: 'fatal',
  message:
    'A VAT breakdown (BG-23) with VAT Category code (BT-118) "Standard rate" shall not have a VAT exemption reason code (BT-121) or VAT exemption reason text (BT-120).',
} as const satisfies SchematronRule;

export function validateCenEn16931BrS10(document: PeppolDocument): SchematronRuleResult {
  const passed = getTaxSubtotalsWithCode(document, 'S').every(
    st => st.taxCategory.taxExemptionReason === undefined && st.taxCategory.taxExemptionReasonCode === undefined
  );
  return schematronResult(rule, passed);
}
