import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { everyDocumentChargeCategoryPercent, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-O-07',
  level: 'fatal',
  message:
    'A Document level charge (BG-21) where the VAT category code (BT-102) is "Not subject to VAT" shall not contain a Document level charge VAT rate (BT-103).',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrO07(document: PeppolDocument): boolean {
  const passed = everyDocumentChargeCategoryPercent(document, 'O', percent => percent === undefined);
  return passed;
}

export const validateCenEn16931BrO07 = schematronRule(rule, evaluateCenEn16931BrO07);
