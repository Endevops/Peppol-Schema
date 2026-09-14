import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { getTaxSubtotalsWithCode, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-G-09',
  level: 'fatal',
  message:
    'The VAT category tax amount (BT-117) in a VAT breakdown (BG-23) where the VAT category code (BT-118) is "Export outside the EU" shall be 0 (zero).',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrG09(document: PeppolDocument): boolean {
  const passed = getTaxSubtotalsWithCode(document, 'G').every(st => st.taxAmount === 0);
  return passed;
}

export const validateCenEn16931BrG09 = schematronRule(rule, evaluateCenEn16931BrG09);
