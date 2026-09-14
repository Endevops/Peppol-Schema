import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-45',
  level: 'fatal',
  message: 'Each VAT breakdown (BG-23) shall have a VAT category taxable amount (BT-116).',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br45(document: PeppolDocument): boolean {
  const passed = document.taxTotals.every(total =>
    (total.taxSubtotals ?? []).every(st => typeof st.taxableAmount === 'object' && st.taxableAmount !== null)
  );
  return passed;
}

export const validateCenEn16931Br45 = schematronRule(rule, evaluateCenEn16931Br45);
