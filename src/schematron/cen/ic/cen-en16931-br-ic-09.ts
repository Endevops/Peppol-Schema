import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getTaxSubtotalsWithCode, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-IC-09',
  level: 'fatal',
  message:
    'The VAT category tax amount (BT-117) in a VAT breakdown (BG-23) where the VAT category code (BT-118) is "Intra-community supply" shall be 0 (zero).',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrIc09(document: PeppolDocument): boolean {
  const passed = getTaxSubtotalsWithCode(document, 'K').every(st => st.taxAmount === 0);
  return passed;
}

export const validateCenEn16931BrIc09 = schematronRule(rule, evaluateCenEn16931BrIc09);
