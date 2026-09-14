import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-49',
  level: 'fatal',
  message: 'A Payment instruction (BG-16) shall specify the Payment means type code (BT-81).',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br49(document: PeppolDocument): boolean {
  const passed = (document.paymentMeans ?? []).every(pm => typeof pm.paymentMeansCode?.code === 'string' && pm.paymentMeansCode.code.trim() !== '');
  return passed;
}

export const validateCenEn16931Br49 = schematronRule(rule, evaluateCenEn16931Br49);
