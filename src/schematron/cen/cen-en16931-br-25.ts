import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { getLines, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-25',
  level: 'fatal',
  message: 'Each Invoice line (BG-25) shall contain the Item name (BT-153).',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br25(document: PeppolDocument): boolean {
  const passed = getLines(document).every(line => typeof line.item.name === 'string' && line.item.name.trim() !== '');
  return passed;
}

export const validateCenEn16931Br25 = schematronRule(rule, evaluateCenEn16931Br25);
