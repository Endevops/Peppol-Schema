import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { getTaxSubtotalsWithCode, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-Z-09',
  level: 'fatal',
  message: 'The VAT category tax amount (BT-117) in a VAT breakdown (BG-23) where VAT category code (BT-118) is "Zero rated" shall equal 0 (zero).',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrZ09(document: PeppolDocument): boolean {
  const passed = getTaxSubtotalsWithCode(document, 'Z').every(st => st.taxAmount === 0);
  return passed;
}

export const validateCenEn16931BrZ09 = schematronRule(rule, evaluateCenEn16931BrZ09);
