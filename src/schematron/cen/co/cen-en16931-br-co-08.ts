import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-CO-08',
  level: 'fatal',
  message: 'Invoice line charge reason code (BT-145) and Invoice line charge reason (BT-144) shall indicate the same type of charge reason.',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrCo08(document: PeppolDocument): boolean {
  void document;
  return true;
}

export const validateCenEn16931BrCo08 = schematronRule(rule, evaluateCenEn16931BrCo08);
