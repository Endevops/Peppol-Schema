import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getTaxSubtotalsWithCode, round2, schematronRule, withinSlackOne } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-AF-09',
  level: 'fatal',
  message:
    'The VAT category tax amount (BT-117) in a VAT breakdown (BG-23) where VAT category code (BT-118) is "IGIC" shall equal the VAT category taxable amount (BT-116) multiplied by the VAT category rate (BT-119).',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrAf09(document: PeppolDocument): boolean {
  const passed = getTaxSubtotalsWithCode(document, 'L').every(st =>
    withinSlackOne(st.taxAmount, round2((st.taxableAmount * (st.taxCategory.percent ?? 0)) / 100))
  );
  return passed;
}

export const validateCenEn16931BrAf09 = schematronRule(rule, evaluateCenEn16931BrAf09);
