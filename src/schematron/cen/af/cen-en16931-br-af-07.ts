import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { everyDocumentChargeCategoryPercent, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-AF-07',
  level: 'fatal',
  message:
    'In a Document level charge (BG-21) where the Document level charge VAT category code (BT-102) is "IGIC" the Document level charge VAT rate (BT-103) shall be 0 (zero) or greater than zero.',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrAf07(document: PeppolDocument): boolean {
  const passed = everyDocumentChargeCategoryPercent(document, 'L', percent => percent !== undefined && percent >= 0);
  return passed;
}

export const validateCenEn16931BrAf07 = schematronRule(rule, evaluateCenEn16931BrAf07);
