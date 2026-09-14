import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { countVatBreakdownCode, hasAnyVatCategoryCode, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-S-01',
  level: 'fatal',
  message:
    'An Invoice that contains an Invoice line (BG-25), a Document level allowance (BG-20) or a Document level charge (BG-21) where the VAT category code (BT-151, BT-95 or BT-102) is "Standard rated" shall contain in the VAT breakdown (BG-23) at least one VAT category code (BT-118) equal with "Standard rated".',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrS01(document: PeppolDocument): boolean {
  const passed = !hasAnyVatCategoryCode(document, 'S') || countVatBreakdownCode(document, 'S') > 0;
  return passed;
}

export const validateCenEn16931BrS01 = schematronRule(rule, evaluateCenEn16931BrS01);
