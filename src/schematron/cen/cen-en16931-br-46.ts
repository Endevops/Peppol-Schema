import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-46',
  level: 'fatal',
  message: 'Each VAT breakdown (BG-23) shall have a VAT category tax amount (BT-117).',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br46(document: PeppolDocument): boolean {
  const passed = document.taxTotals.every(total => (total.taxSubtotals ?? []).every(st => typeof st.taxAmount === 'object' && st.taxAmount !== null));
  return passed;
}

export const validateCenEn16931Br46 = schematronRule(rule, evaluateCenEn16931Br46);
