import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { countVatBreakdownCode, hasAnyVatCategoryCode, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-O-01',
  level: 'fatal',
  message:
    'An Invoice that contains an Invoice line (BG-25), a Document level allowance (BG-20) or a Document level charge (BG-21) where the VAT category code (BT-151, BT-95 or BT-102) is "Not subject to VAT" shall contain exactly one VAT breakdown group (BG-23) with the VAT category code (BT-118) equal to "Not subject to VAT".',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrO01(document: PeppolDocument): boolean {
  const passed = !hasAnyVatCategoryCode(document, 'O') || countVatBreakdownCode(document, 'O') === 1;
  return passed;
}

export const validateCenEn16931BrO01 = schematronRule(rule, evaluateCenEn16931BrO01);
