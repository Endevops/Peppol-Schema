import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getLines, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-16',
  level: 'fatal',
  message: 'An Invoice shall have at least one Invoice line (BG-25)',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br16(document: PeppolDocument): boolean {
  const passed = getLines(document).length > 0;
  return passed;
}

export const validateCenEn16931Br16 = schematronRule(rule, evaluateCenEn16931Br16);
