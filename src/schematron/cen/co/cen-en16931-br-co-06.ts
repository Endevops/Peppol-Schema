import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-CO-06',
  level: 'fatal',
  message: 'Document level charge reason code (BT-105) and Document level charge reason (BT-104) shall indicate the same type of charge.',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrCo06(document: PeppolDocument): boolean {
  void document;
  return true;
}

export const validateCenEn16931BrCo06 = schematronRule(rule, evaluateCenEn16931BrCo06);
