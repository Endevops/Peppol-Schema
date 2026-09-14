import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-36',
  level: 'fatal',
  message: 'Each Document level charge (BG-21) shall have a Document level charge amount (BT-99).',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br36(document: PeppolDocument): boolean {
  const passed = (document.allowanceCharges ?? []).filter(ac => ac.chargeIndicator).every(ac => typeof ac.amount === 'object' && ac.amount !== null);
  return passed;
}

export const validateCenEn16931Br36 = schematronRule(rule, evaluateCenEn16931Br36);
