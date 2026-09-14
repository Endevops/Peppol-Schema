import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-CO-07',
  level: 'fatal',
  message: 'Invoice line allowance reason code (BT-140) and Invoice line allowance reason (BT-139) shall indicate the same type of allowance reason.',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrCo07(document: PeppolDocument): boolean {
  void document;
  return true;
}

export const validateCenEn16931BrCo07 = schematronRule(rule, evaluateCenEn16931BrCo07);
