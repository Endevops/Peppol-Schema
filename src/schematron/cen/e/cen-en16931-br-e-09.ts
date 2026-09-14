import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { getTaxSubtotalsWithCode, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-E-09',
  level: 'fatal',
  message:
    'The VAT category tax amount (BT-117) In a VAT breakdown (BG-23) where the VAT category code (BT-118) equals "Exempt from VAT" shall equal 0 (zero).',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrE09(document: PeppolDocument): boolean {
  const passed = getTaxSubtotalsWithCode(document, 'E').every(st => st.taxAmount === 0);
  return passed;
}

export const validateCenEn16931BrE09 = schematronRule(rule, evaluateCenEn16931BrE09);
