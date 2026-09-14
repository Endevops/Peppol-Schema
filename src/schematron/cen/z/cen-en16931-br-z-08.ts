import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { amountsEqual, categoryTaxableSum, getTaxSubtotalsWithCode, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-Z-08',
  level: 'fatal',
  message:
    'In a VAT breakdown (BG-23) where VAT category code (BT-118) is "Zero rated" the VAT category taxable amount (BT-116) shall equal the sum of Invoice line net amount (BT-131) minus the sum of Document level allowance amounts (BT-92) plus the sum of Document level charge amounts (BT-99) where the VAT category codes (BT-151, BT-95, BT-102) are "Zero rated".',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrZ08(document: PeppolDocument): boolean {
  const passed = getTaxSubtotalsWithCode(document, 'Z').every(st => amountsEqual(st.taxableAmount, categoryTaxableSum(document, 'Z')));
  return passed;
}

export const validateCenEn16931BrZ08 = schematronRule(rule, evaluateCenEn16931BrZ08);
