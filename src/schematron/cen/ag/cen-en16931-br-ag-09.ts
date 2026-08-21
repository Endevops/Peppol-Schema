import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getTaxSubtotalsWithCode, round2, schematronResult, withinSlackOne } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-AG-09',
  level: 'fatal',
  message:
    'The VAT category tax amount (BT-117) in a VAT breakdown (BG-23) where VAT category code (BT-118) is "IPSI" shall equal the VAT category taxable amount (BT-116) multiplied by the VAT category rate (BT-119).',
} as const satisfies SchematronRule;

export function validateCenEn16931BrAg09(document: PeppolDocument): SchematronRuleResult {
  const passed = getTaxSubtotalsWithCode(document, 'M').every(st =>
    withinSlackOne(st.taxAmount, round2((st.taxableAmount * (st.taxCategory.percent ?? 0)) / 100))
  );
  return schematronResult(rule, passed);
}
