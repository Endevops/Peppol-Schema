import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getLines, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-21',
  level: 'fatal',
  message: 'Each Invoice line (BG-25) shall have an Invoice line identifier (BT-126).',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br21(document: PeppolDocument): boolean {
  const passed = getLines(document).every(line => typeof line.id === 'string' && line.id.trim() !== '');
  return passed;
}

export const validateCenEn16931Br21 = schematronRule(rule, evaluateCenEn16931Br21);
