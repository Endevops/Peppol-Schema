import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { everyDocumentAllowanceCategoryPercent, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-E-06',
  level: 'fatal',
  message:
    'In a Document level allowance (BG-20) where the Document level allowance VAT category code (BT-95) is "Exempt from VAT", the Document level allowance VAT rate (BT-96) shall be 0 (zero).',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrE06(document: PeppolDocument): boolean {
  const passed = everyDocumentAllowanceCategoryPercent(document, 'E', percent => percent === 0);
  return passed;
}

export const validateCenEn16931BrE06 = schematronRule(rule, evaluateCenEn16931BrE06);
