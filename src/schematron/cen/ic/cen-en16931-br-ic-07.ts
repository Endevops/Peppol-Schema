import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { everyDocumentChargeCategoryPercent, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-IC-07',
  level: 'fatal',
  message:
    'In a Document level charge (BG-21) where the Document level charge VAT category code (BT-102) is "Intra-community supply" the Document level charge VAT rate (BT-103) shall be 0 (zero).',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrIc07(document: PeppolDocument): boolean {
  const passed = everyDocumentChargeCategoryPercent(document, 'K', percent => percent === 0);
  return passed;
}

export const validateCenEn16931BrIc07 = schematronRule(rule, evaluateCenEn16931BrIc07);
