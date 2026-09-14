import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { everyDocumentAllowanceCategoryPercent, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-O-06',
  level: 'fatal',
  message:
    'A Document level allowance (BG-20) where VAT category code (BT-95) is "Not subject to VAT" shall not contain a Document level allowance VAT rate (BT-96).',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrO06(document: PeppolDocument): boolean {
  const passed = everyDocumentAllowanceCategoryPercent(document, 'O', percent => percent === undefined);
  return passed;
}

export const validateCenEn16931BrO06 = schematronRule(rule, evaluateCenEn16931BrO06);
