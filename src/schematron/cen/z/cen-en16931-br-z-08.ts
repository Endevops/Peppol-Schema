import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { amountsEqual, getTaxSubtotalsWithCode, categoryTaxableSum, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-Z-08',
  level: 'fatal',
  message:
    'In a VAT breakdown (BG-23) where VAT category code (BT-118) is "Zero rated" the VAT category taxable amount (BT-116) shall equal the sum of Invoice line net amount (BT-131) minus the sum of Document level allowance amounts (BT-92) plus the sum of Document level charge amounts (BT-99) where the VAT category codes (BT-151, BT-95, BT-102) are "Zero rated".',
} as const satisfies SchematronRule;

export function validateCenEn16931BrZ08(document: PeppolDocument): SchematronRuleResult {
  const passed = getTaxSubtotalsWithCode(document, 'Z').every(st => amountsEqual(st.taxableAmount, categoryTaxableSum(document, 'Z')));
  return schematronResult(rule, passed);
}
