import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { countVatBreakdownCode, hasAnyVatCategoryCode, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-IC-01',
  level: 'fatal',
  message:
    'An Invoice that contains an Invoice line (BG-25), a Document level allowance (BG-20) or a Document level charge (BG-21) where the VAT category code (BT-151, BT-95 or BT-102) is "Intra-community supply" shall contain in the VAT breakdown (BG-23) exactly one VAT category code (BT-118) equal with "Intra-community supply".',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrIc01(document: PeppolDocument): boolean {
  const passed = !hasAnyVatCategoryCode(document, 'K') || countVatBreakdownCode(document, 'K') === 1;
  return passed;
}

export const validateCenEn16931BrIc01 = schematronRule(rule, evaluateCenEn16931BrIc01);
