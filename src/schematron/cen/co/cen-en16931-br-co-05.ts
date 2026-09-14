import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-CO-05',
  level: 'fatal',
  message: 'Document level allowance reason code (BT-98) and Document level allowance reason (BT-97) shall indicate the same type of allowance.',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrCo05(document: PeppolDocument): boolean {
  void document;
  return true;
}

export const validateCenEn16931BrCo05 = schematronRule(rule, evaluateCenEn16931BrCo05);
