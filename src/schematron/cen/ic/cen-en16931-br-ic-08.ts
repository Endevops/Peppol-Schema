import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { amountsEqual, getTaxSubtotalsWithCode, categoryTaxableSum, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-IC-08',
  level: 'fatal',
  message:
    'In a VAT breakdown (BG-23) where the VAT category code (BT-118) is "Intra-community supply" the VAT category taxable amount (BT-116) shall equal the sum of Invoice line net amounts (BT-131) minus the sum of Document level allowance amounts (BT-92) plus the sum of Document level charge amounts (BT-99) where the VAT category codes (BT-151, BT-95, BT-102) are "Intra-community supply".',
} as const satisfies SchematronRule;

export function validateCenEn16931BrIc08(document: PeppolDocument): SchematronRuleResult {
  const passed = getTaxSubtotalsWithCode(document, 'K').every(st => amountsEqual(st.taxableAmount, categoryTaxableSum(document, 'K')));
  return schematronResult(rule, passed);
}
