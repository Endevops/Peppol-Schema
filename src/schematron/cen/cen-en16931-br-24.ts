import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { getLines, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-24',
  level: 'fatal',
  message: 'Each Invoice line (BG-25) shall have an Invoice line net amount (BT-131).',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br24(document: PeppolDocument): boolean {
  const passed = getLines(document).every(line => typeof line.lineExtensionAmount === 'object' && line.lineExtensionAmount !== null);
  return passed;
}

export const validateCenEn16931Br24 = schematronRule(rule, evaluateCenEn16931Br24);
