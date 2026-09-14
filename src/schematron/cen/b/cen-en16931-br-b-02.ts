import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { hasVatCategoryCode, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-B-02',
  level: 'fatal',
  message:
    'An Invoice that contains an Invoice line (BG-25), a Document level allowance (BG-20) or a Document level charge (BG-21) where the VAT category code (BT-151, BT-95 or BT-102) is “Split payment" shall not contain an invoice line (BG-25), a Document level allowance (BG-20) or a Document level charge (BG-21) where the VAT category code (BT-151, BT-95 or BT-102) is “Standard rated”.',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrB02(document: PeppolDocument): boolean {
  const passed = !hasVatCategoryCode(document, 'B') || !hasVatCategoryCode(document, 'S');
  return passed;
}

export const validateCenEn16931BrB02 = schematronRule(rule, evaluateCenEn16931BrB02);
