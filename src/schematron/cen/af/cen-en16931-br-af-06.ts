import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { everyDocumentAllowanceCategoryPercent, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-AF-06',
  level: 'fatal',
  message:
    'In a Document level allowance (BG-20) where the Document level allowance VAT category code (BT-95) is "IGIC" the Document level allowance VAT rate (BT-96) shall be 0 (zero) or greater than zero.',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrAf06(document: PeppolDocument): boolean {
  const passed = everyDocumentAllowanceCategoryPercent(document, 'L', percent => percent !== undefined && percent >= 0);
  return passed;
}

export const validateCenEn16931BrAf06 = schematronRule(rule, evaluateCenEn16931BrAf06);
