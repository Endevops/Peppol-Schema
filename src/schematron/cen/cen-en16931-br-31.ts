import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-31',
  level: 'fatal',
  message: 'Each Document level allowance (BG-20) shall have a Document level allowance amount (BT-92).',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br31(document: PeppolDocument): boolean {
  const passed = (document.allowanceCharges ?? []).filter(ac => !ac.chargeIndicator).every(ac => typeof ac.amount === 'object' && ac.amount !== null);
  return passed;
}

export const validateCenEn16931Br31 = schematronRule(rule, evaluateCenEn16931Br31);
